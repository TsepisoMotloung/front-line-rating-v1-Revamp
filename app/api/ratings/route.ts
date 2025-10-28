import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { sendNewRatingNotificationEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
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
    if (!agentId || !customerName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!responses || !Array.isArray(responses) || responses.length === 0) {
      return NextResponse.json(
        { error: 'At least one response is required' },
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
    const agentId = searchParams.get('agentId');
    const departmentId = searchParams.get('departmentId');
    const isComplaint = searchParams.get('isComplaint');
    const limit = parseInt(searchParams.get('limit') || '50');

    const where: any = {};

    if (agentId) where.agentId = agentId;
    if (departmentId) where.departmentId = departmentId;
    if (isComplaint !== null) where.isComplaint = isComplaint === 'true';

    const ratings = await prisma.rating.findMany({
      where,
      include: {
        agent: {
          select: {
            name: true,
            employeeId: true,
          },
        },
        department: {
          select: {
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

    return NextResponse.json(ratings);
  } catch (error) {
    console.error('Error fetching ratings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch ratings' },
      { status: 500 }
    );
  }
}