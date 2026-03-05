import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const startTime = Date.now();
    console.log('[ADMIN-STATS] Starting admin stats request');
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      console.log('[ADMIN-STATS] Unauthorized access attempt');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // RUN ALL QUERIES IN PARALLEL for optimal performance
    const [
      totalUsers,
      pendingApprovals,
      totalDepartments,
      ratings,
      totalComplaints,
      openComplaints,
      trendRatings,
      departments,
      agents,
      pendingUsers,
      recentActivity,
    ] = await Promise.all([
      // User counts
      prisma.user.count({ where: { status: 'APPROVED' } }),
      prisma.user.count({ where: { status: 'PENDING' } }),
      
      // Department count
      prisma.department.count({ where: { isActive: true } }),
      
      // All ratings with responses
      prisma.rating.findMany({ include: { responses: true } }),
      
      // Complaint counts
      prisma.rating.count({ where: { isComplaint: true } }),
      prisma.rating.count({ where: { isComplaint: true, complaintStatus: 'OPEN' } }),
      
      // Trend data (last 30 days)
      prisma.rating.findMany({
        where: { createdAt: { gte: thirtyDaysAgo } },
        include: { responses: true },
        orderBy: { createdAt: 'asc' },
      }),
      
      // Department performance
      prisma.department.findMany({
        where: { isActive: true },
        include: {
          ratings: {
            include: { responses: true },
          },
        },
      }),
      
      // Agent performance (last 30 days only)
      prisma.user.findMany({
        where: { role: 'AGENT', status: 'APPROVED' },
        include: {
          department: { select: { name: true } },
          ratings: {
            include: { responses: true },
            where: { createdAt: { gte: thirtyDaysAgo } },
          },
        },
      }),
      
      // Pending users
      prisma.user.findMany({
        where: { status: 'PENDING' },
        include: { department: { select: { name: true } } },
        orderBy: { createdAt: 'desc' },
      }),
      
      // Recent activity
      prisma.rating.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: {
          agent: { select: { name: true } },
          department: { select: { name: true } },
        },
      }),
    ]);

    // Process data (calculations happen in-memory, very fast)
    const totalRatings = ratings.length;
    
    let totalScore = 0;
    let totalResponses = 0;
    ratings.forEach(({ responses }) => {
      responses.forEach(({ score }) => {
        totalScore += score;
        totalResponses++;
      });
    });

    const averageRating = totalResponses > 0 ? totalScore / totalResponses : 0;
    const satisfactionPercentage = Math.round((averageRating / 5) * 100);

    // Rating distribution
    const ratingsWithAverages = ratings.map((rating) => ({
      ...rating,
      averageScore: rating.responses.length > 0
        ? rating.responses.reduce((sum, r) => sum + r.score, 0) / rating.responses.length
        : 0,
    }));

    const ratings5 = ratingsWithAverages.filter((r) => r.averageScore >= 4.5).length;
    const ratings4 = ratingsWithAverages.filter((r) => r.averageScore >= 4 && r.averageScore < 4.5).length;
    const ratings3 = ratingsWithAverages.filter((r) => r.averageScore >= 3 && r.averageScore < 4).length;
    const ratings2 = ratingsWithAverages.filter((r) => r.averageScore >= 2 && r.averageScore < 3).length;
    const ratings1 = ratingsWithAverages.filter((r) => r.averageScore < 2).length;

    // Trend data
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

    // Department performance
    const departmentPerformance = departments.map((dept) => {
      let deptTotalScore = 0;
      let deptTotalResponses = 0;

      dept.ratings.forEach((rating) => {
        rating.responses.forEach((response) => {
          deptTotalScore += response.score;
          deptTotalResponses++;
        });
      });

      return {
        name: dept.name,
        avgRating: deptTotalResponses > 0 ? deptTotalScore / deptTotalResponses : 0,
        totalRatings: dept.ratings.length,
      };
    }).sort((a, b) => b.avgRating - a.avgRating);

    // Agent performance
    const agentPerformance = agents
      .map((agent) => {
        let agentTotalScore = 0;
        let agentTotalResponses = 0;

        agent.ratings.forEach((rating) => {
          rating.responses.forEach((response) => {
            agentTotalScore += response.score;
            agentTotalResponses++;
          });
        });

        const avgRating = agentTotalResponses > 0 ? agentTotalScore / agentTotalResponses : 0;

        return {
          name: agent.name,
          departmentName: agent.department?.name || 'N/A',
          avgRating,
          totalRatings: agent.ratings.length,
          satisfactionPercentage: Math.round((avgRating / 5) * 100),
        };
      })
      .filter((agent) => agent.totalRatings > 0)
      .sort((a, b) => b.avgRating - a.avgRating)
      .slice(0, 6);

    // Pending users
    const pendingUsersData = pendingUsers.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      departmentName: user.department?.name,
      createdAt: user.createdAt,
    }));

    console.log('✅ [ADMIN-STATS] Completed in', Date.now() - startTime, 'ms');

    // Count alliance ratings separately
    const allianceRatings = ratings.filter(r => r.ratingType === 'ALLIANCE').length;

    return NextResponse.json({
      totalUsers,
      pendingApprovals,
      totalDepartments,
      totalRatings,
      allianceRatings,
      averageRating: Math.round(averageRating * 10) / 10,
      satisfactionPercentage,
      totalComplaints,
      openComplaints,
      ratings5,
      ratings4,
      ratings3,
      ratings2,
      ratings1,
      trendData,
      departmentPerformance,
      topPerformers: agentPerformance,
      pendingUsers: pendingUsersData,
      recentActivity,
    });
  } catch (error) {
    console.error('❌ [ADMIN-STATS] Error:', error);
    console.error('[ADMIN-STATS] Error details:', error instanceof Error ? error.message : String(error));
    return NextResponse.json(
      { 
        error: 'Failed to fetch statistics',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    );
  }
}
