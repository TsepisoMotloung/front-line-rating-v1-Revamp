import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get total users
    const totalUsers = await prisma.user.count({
      where: {
        status: 'APPROVED',
      },
    });

    // Get pending approvals
    const pendingApprovals = await prisma.user.count({
      where: {
        status: 'PENDING',
      },
    });

    // Get total departments
    const totalDepartments = await prisma.department.count({
      where: {
        isActive: true,
      },
    });

    // Get all ratings
    const ratings = await prisma.rating.findMany({
      include: {
        responses: true,
      },
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

    // Get complaints
    const totalComplaints = await prisma.rating.count({
      where: {
        isComplaint: true,
      },
    });

    const openComplaints = await prisma.rating.count({
      where: {
        isComplaint: true,
        complaintStatus: 'OPEN',
      },
    });

    // Get trend data (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const trendRatings = await prisma.rating.findMany({
      where: {
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

    // Get department performance
    const departments = await prisma.department.findMany({
      where: {
        isActive: true,
      },
      include: {
        ratings: {
          include: {
            responses: true,
          },
        },
      },
    });

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
    });

    // Get top performers (top 6 agents)
    const agents = await prisma.user.findMany({
      where: {
        role: 'AGENT',
        status: 'APPROVED',
      },
      include: {
        department: {
          select: {
            name: true,
          },
        },
        ratings: {
          include: {
            responses: true,
          },
          where: {
            createdAt: {
              gte: thirtyDaysAgo,
            },
          },
        },
      },
    });

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

    // Get pending users
    const pendingUsers = await prisma.user.findMany({
      where: {
        status: 'PENDING',
      },
      include: {
        department: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const pendingUsersData = pendingUsers.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      departmentName: user.department?.name,
      createdAt: user.createdAt,
    }));

    // Get recent activity
    const recentActivity = await prisma.rating.findMany({
      take: 10,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        agent: {
          select: {
            name: true,
          },
        },
        department: {
          select: {
            name: true,
          },
        },
      },
    });

    return NextResponse.json({
      totalUsers,
      pendingApprovals,
      totalDepartments,
      totalRatings,
      averageRating: Math.round(averageRating * 10) / 10,
      satisfactionPercentage,
      totalComplaints,
      openComplaints,
      trendData,
      departmentPerformance: departmentPerformance.sort((a, b) => b.avgRating - a.avgRating),
      topPerformers: agentPerformance,
      pendingUsers: pendingUsersData,
      recentActivity,
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    );
  }
}