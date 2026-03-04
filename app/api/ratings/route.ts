import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { sendNewRatingNotificationEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      ratingType,
      agentId,
      customerName,
      customerContact,
      policyNumber,
      isAnonymous,
      isComplaint,
      feedbackText,
      responses,
    } = body;

    // Validate required fields
    if (!customerName) {
      return NextResponse.json(
        { error: 'Missing required fields: customerName' },
        { status: 400 }
      );
    }

    if (!responses || !Array.isArray(responses) || responses.length === 0) {
      return NextResponse.json(
        { error: 'At least one response is required' },
        { status: 400 }
      );
    }

    // Handle different rating types
    if (ratingType === 'ALLIANCE') {
      // Alliance Insurance rating - no agent or department required
      const ipAddress = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
      const userAgent = request.headers.get('user-agent') || 'unknown';

      // Store responses as JSON since they reference AllianceInsuranceQuestion, not Question
      const rating = await prisma.rating.create({
        data: {
          ratingType: 'ALLIANCE',
          customerName,
          customerContact,
          policyNumber,
          isAnonymous,
          isComplaint,
          feedbackText,
          complaintStatus: isComplaint ? 'OPEN' : undefined,
          ipAddress,
          userAgent,
          allianceResponses: responses, // Store as JSON
        },
      });

      return NextResponse.json(
        {
          message: 'Alliance Insurance rating submitted successfully',
          rating: { id: rating.id },
        },
        { status: 201 }
      );
    }

    // Legacy COMPANY rating (maps to ALLIANCE ratingType)
    if (ratingType === 'COMPANY') {
      // Company rating - no agent or department required
      const ipAddress = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
      const userAgent = request.headers.get('user-agent') || 'unknown';

      // Store responses as JSON since they reference AllianceInsuranceQuestion, not Question
      const rating = await prisma.rating.create({
        data: {
          ratingType: 'ALLIANCE', // Company ratings use ALLIANCE type
          customerName,
          customerContact,
          policyNumber,
          isAnonymous,
          isComplaint,
          feedbackText,
          complaintStatus: isComplaint ? 'OPEN' : undefined,
          ipAddress,
          userAgent,
          allianceResponses: responses, // Store as JSON
        },
      });

      return NextResponse.json(
        {
          message: 'Rating submitted successfully',
          rating: { id: rating.id },
        },
        { status: 201 }
      );
    }

    // Default AGENT rating
    if (!agentId) {
      return NextResponse.json(
        { error: 'Missing required fields: agentId' },
        { status: 400 }
      );
    }

    // Verify agent exists
    const agent = await prisma.user.findUnique({
      where: { id: agentId },
      include: { department: true },
    });

    if (!agent || agent.role !== 'AGENT') {
      return NextResponse.json(
        { error: 'Invalid agent' },
        { status: 400 }
      );
    }

    // Get client IP and user agent
    const ipAddress = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Create rating with responses
    const rating = await prisma.rating.create({
      data: {
        agentId,
        departmentId: agent.departmentId!,
        customerName,
        customerContact,
        policyNumber,
        isAnonymous,
        isComplaint,
        feedbackText,
        complaintStatus: isComplaint ? 'OPEN' : undefined,
        ipAddress,
        userAgent,
        responses: {
          create: responses.map((r: any) => ({
            questionId: r.questionId,
            score: r.score,
          })),
        },
      },
      include: {
        responses: true,
      },
    });

    // Calculate average score
    const totalScore = responses.reduce((sum: number, r: any) => sum + r.score, 0);
    const averageScore = totalScore / responses.length;

    // Create notification for agent
    await prisma.notification.create({
      data: {
        userId: agentId,
        title: isComplaint ? 'New Complaint Received' : 'New Rating Received',
        message: `You received a new ${isComplaint ? 'complaint' : 'rating'} from ${customerName}`,
        type: isComplaint ? 'complaint' : 'rating',
        link: `/dashboard/my-ratings`,
      },
    });

    // If complaint, notify HOD
    if (isComplaint && agent.department) {
      const hods = await prisma.user.findMany({
        where: {
          departmentId: agent.departmentId,
          role: 'HOD',
          status: 'APPROVED',
        },
      });

      for (const hod of hods) {
        await prisma.notification.create({
          data: {
            userId: hod.id,
            title: 'New Complaint in Your Department',
            message: `A complaint was filed against ${agent.name}`,
            type: 'complaint',
            link: `/dashboard/complaints`,
          },
        });
      }
    }

    // Send email notification (fire and forget)
    try {
      await sendNewRatingNotificationEmail(
        agent.email,
        agent.name,
        averageScore,
        isComplaint
      );
    } catch (emailError) {
      console.error('Failed to send email notification:', emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json(
      {
        message: 'Rating submitted successfully',
        rating: {
          id: rating.id,
          averageScore,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error submitting rating:', error);
    return NextResponse.json(
      { error: 'Failed to submit rating' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const ratingType = searchParams.get('ratingType');
    const agentId = searchParams.get('userId');
    const departmentId = searchParams.get('departmentId');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const searchQuery = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit') || '100');

    // Build where clause
    const where: any = {};

    if (ratingType) where.ratingType = ratingType;
    if (agentId && ratingType !== 'ALLIANCE') where.agentId = agentId;
    if (departmentId && ratingType !== 'ALLIANCE') where.departmentId = departmentId;

    // Date range filtering
    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = new Date(startDate);
      if (endDate) where.createdAt.lte = new Date(endDate);
    }

    // Search by customer name or feedback
    if (searchQuery) {
      where.OR = [
        { customerName: { contains: searchQuery } },
        { feedbackText: { contains: searchQuery } },
      ];
    }

    // Fetch ratings
    const ratings = await prisma.rating.findMany({
      where,
      include: {
        agent: {
          select: {
            id: true,
            name: true,
            employeeId: true,
          },
        },
        department: {
          select: {
            id: true,
            name: true,
          },
        },
        responses: {
          include: {
            question: {
              select: {
                questionText: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
    });

    // Calculate average scores
    const ratingsWithAverages = ratings.map((rating) => ({
      ...rating,
      averageScore:
        rating.responses.length > 0
          ? rating.responses.reduce((sum, r) => sum + r.score, 0) / rating.responses.length
          : 0,
    }));

    // Calculate analytics
    const totalRatings = ratingsWithAverages.length;
    const averageRating =
      totalRatings > 0
        ? ratingsWithAverages.reduce((sum, r) => sum + r.averageScore, 0) / totalRatings
        : 0;

    const allianceRatings = ratingsWithAverages.filter((r) => r.ratingType === 'ALLIANCE');
    const agentRatings = ratingsWithAverages.filter((r) => r.ratingType === 'AGENT');

    const satisfactionRate =
      totalRatings > 0
        ? Math.round(
            (ratingsWithAverages.filter((r) => r.averageScore >= 4).length / totalRatings) * 100
          )
        : 0;

    // Trend data (grouped by date)
    const trendMap = new Map<string, { sum: number; count: number }>();
    ratingsWithAverages.forEach((rating) => {
      const date = new Date(rating.createdAt).toISOString().split('T')[0];
      const existing = trendMap.get(date) || { sum: 0, count: 0 };
      trendMap.set(date, {
        sum: existing.sum + rating.averageScore,
        count: existing.count + 1,
      });
    });

    const trendData = Array.from(trendMap.entries())
      .map(([date, data]) => ({
        date,
        average: parseFloat((data.sum / data.count).toFixed(2)),
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(-30); // Last 30 days

    // Ratings by type
    const ratingsByType = [
      {
        name: 'Alliance',
        value: allianceRatings.length,
      },
      {
        name: 'Employee',
        value: agentRatings.length,
      },
    ];

    // Rating distribution (5-star breakdown)
    const ratings5 = ratingsWithAverages.filter((r) => r.averageScore >= 4.5).length;
    const ratings4 = ratingsWithAverages.filter((r) => r.averageScore >= 4 && r.averageScore < 4.5).length;
    const ratings3 = ratingsWithAverages.filter((r) => r.averageScore >= 3 && r.averageScore < 4).length;
    const ratings2 = ratingsWithAverages.filter((r) => r.averageScore >= 2 && r.averageScore < 3).length;
    const ratings1 = ratingsWithAverages.filter((r) => r.averageScore < 2).length;

    // Top agents
    const agentMap = new Map<string, { name: string; scores: number[]; count: number }>();
    agentRatings.forEach((rating) => {
      if (rating.agent) {
        const existing = agentMap.get(rating.agent.id) || {
          name: rating.agent.name,
          scores: [],
          count: 0,
        };
        existing.scores.push(rating.averageScore);
        existing.count += 1;
        agentMap.set(rating.agent.id, existing);
      }
    });

    const topAgents = Array.from(agentMap.values())
      .map((agent) => ({
        name: agent.name,
        average: agent.scores.reduce((a, b) => a + b, 0) / agent.scores.length,
        count: agent.count,
      }))
      .sort((a, b) => b.average - a.average)
      .slice(0, 5);

    // By department
    const deptMap = new Map<string, { name: string; count: number }>();
    ratingsWithAverages.forEach((rating) => {
      if (rating.department) {
        const existing = deptMap.get(rating.department.id) || {
          name: rating.department.name,
          count: 0,
        };
        existing.count += 1;
        deptMap.set(rating.department.id, existing);
      }
    });

    const byDepartment = Array.from(deptMap.values())
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    const analytics = {
      totalRatings,
      averageRating: parseFloat(averageRating.toFixed(2)),
      alliances: allianceRatings.length,
      agents: agentRatings.length,
      satisfactionRate,
      trendData,
      ratingsByType,
      ratings5,
      ratings4,
      ratings3,
      ratings2,
      ratings1,
      topAgents,
      byDepartment,
    };

    return NextResponse.json({
      ratings: ratingsWithAverages,
      analytics,
    });
  } catch (error) {
    console.error('Error fetching ratings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch ratings' },
      { status: 500 }
    );
  }
}