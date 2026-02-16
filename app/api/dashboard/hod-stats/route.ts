import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const startTime = Date.now();
    console.log('🚀 [HOD-STATS] Starting request at', new Date().toISOString());
    
    const session = await getServerSession(authOptions);
    console.log('⏱️ [HOD-STATS] Session retrieved in', Date.now() - startTime, 'ms');

    if (!session || session.user.role !== 'HOD') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const departmentId = session.user.departmentId;

    if (!departmentId) {
      return NextResponse.json({ error: 'No department assigned' }, { status: 400 });
    }

    // Get total agents in department
    const step1 = Date.now();
    console.log('📊 [HOD-STATS] Fetching total agents...');
    const totalAgents = await prisma.user.count({
      where: {
        departmentId,
        role: 'AGENT',
        status: 'APPROVED',
      },
    });
    console.log('✅ [HOD-STATS] Total agents fetched in', Date.now() - step1, 'ms');

    // Get all ratings for department
    const step2 = Date.now();
    console.log('📊 [HOD-STATS] Fetching department ratings...');
    const ratings = await prisma.rating.findMany({
      where: { departmentId },
      include: {
        responses: true,
        agent: {
          select: {
            name: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    const totalRatings = ratings.length;

    // Calculate average rating
    let totalScore = 0;
    let totalResponses = 0;

    ratings.forEach((rating) => {
      rating.responses.forEach((response) => {
        totalScore += response.score;
        totalResponses++;
      });
    });

    const averageRating = totalResponses > 0 ? totalScore / totalResponses : 0;
    const satisfactionPercentage = Math.round((averageRating / 5) * 100);

    // Calculate rating distribution
    const ratingsWithAverages = ratings.map((rating) => ({
      ...rating,
      averageScore:
        rating.responses.length > 0
          ? rating.responses.reduce((sum, r) => sum + r.score, 0) / rating.responses.length
          : 0,
    }));

    const ratings5 = ratingsWithAverages.filter((r) => r.averageScore >= 4.5).length;
    const ratings4 = ratingsWithAverages.filter((r) => r.averageScore >= 4 && r.averageScore < 4.5).length;
    const ratings3 = ratingsWithAverages.filter((r) => r.averageScore >= 3 && r.averageScore < 4).length;
    const ratings2 = ratingsWithAverages.filter((r) => r.averageScore >= 2 && r.averageScore < 3).length;
    const ratings1 = ratingsWithAverages.filter((r) => r.averageScore < 2).length;

    // Get complaints
    const totalComplaints = await prisma.rating.count({
      where: {
        departmentId,
        isComplaint: true,
      },
    });

    const openComplaints = await prisma.rating.count({
      where: {
        departmentId,
        isComplaint: true,
        complaintStatus: 'OPEN',
      },
    });

    const resolvedComplaints = totalComplaints - openComplaints;

    // Get trend data (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const trendRatings = await prisma.rating.findMany({
      where: {
        departmentId,
        createdAt: {
          gte: thirtyDaysAgo,
        },
      },
      include: {
        responses: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    // Group by date
    const trendMap = new Map();
    trendRatings.forEach((rating) => {
      const date = rating.createdAt.toISOString().split('T')[0];
      if (!trendMap.has(date)) {
        trendMap.set(date, { count: 0, totalScore: 0, totalResponses: 0 });
      }
      const data = trendMap.get(date);
      data.count++;
      rating.responses.forEach((r) => {
        data.totalScore += r.score;
        data.totalResponses++;
      });
    });

    const trendData = Array.from(trendMap.entries()).map(([date, data]) => ({
      date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      count: data.count,
      avgRating: data.totalResponses > 0 ? data.totalScore / data.totalResponses : 0,
    }));

    // Get agent performance
    const agents = await prisma.user.findMany({
      where: {
        departmentId,
        role: 'AGENT',
        status: 'APPROVED',
      },
      select: {
        id: true,
        name: true,
      },
    });

    const agentPerformance = await Promise.all(
      agents.map(async (agent) => {
        const agentRatings = await prisma.rating.findMany({
          where: {
            agentId: agent.id,
          },
          include: {
            responses: true,
          },
        });

        let agentTotalScore = 0;
        let agentTotalResponses = 0;

        agentRatings.forEach((rating) => {
          rating.responses.forEach((response) => {
            agentTotalScore += response.score;
            agentTotalResponses++;
          });
        });

        return {
          name: agent.name,
          avgRating: agentTotalResponses > 0 ? agentTotalScore / agentTotalResponses : 0,
          totalRatings: agentRatings.length,
        };
      })
    );

    // Get recent complaints
    const recentComplaints = await prisma.rating.findMany({
      where: {
        departmentId,
        isComplaint: true,
      },
      include: {
        agent: {
          select: {
            name: true,
          },
        },
        responses: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 5,
    });

    const complaintsWithScores = recentComplaints
      .filter((complaint) => complaint.agent !== null)
      .map((complaint) => {
        let totalScore = 0;
        complaint.responses.forEach((r) => {
          totalScore += r.score;
        });
        const averageScore = complaint.responses.length > 0 ? totalScore / complaint.responses.length : 0;

        return {
          id: complaint.id,
          agentName: complaint.agent!.name,
          customerName: complaint.customerName,
          feedbackText: complaint.feedbackText,
          complaintStatus: complaint.complaintStatus,
          averageScore,
          createdAt: complaint.createdAt,
        };
      });

    return NextResponse.json({
      totalAgents,
      totalRatings,
      averageRating: Math.round(averageRating * 10) / 10,
      satisfactionPercentage,
      totalComplaints,
      openComplaints,
      resolvedComplaints,
      ratings5,
      ratings4,
      ratings3,
      ratings2,
      ratings1,
      trendData,
      agentPerformance: agentPerformance.sort((a, b) => b.avgRating - a.avgRating),
      recentComplaints: complaintsWithScores,
    });
  } catch (error) {
    console.error('Error fetching HOD stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    );
  }
}