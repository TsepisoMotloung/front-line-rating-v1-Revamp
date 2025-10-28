import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'AGENT') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const agentId = session.user.id;

    // Get all ratings for this agent
    const ratings = await prisma.rating.findMany({
      where: { agentId },
      include: {
        responses: true,
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

    // Get complaints
    const totalComplaints = await prisma.rating.count({
      where: {
        agentId,
        isComplaint: true,
      },
    });

    // Get trend data (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const trendRatings = await prisma.rating.findMany({
      where: {
        agentId,
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

    // Get recent ratings (last 5)
    const recentRatings = ratings.slice(0, 5).map((rating) => {
      let ratingTotalScore = 0;
      rating.responses.forEach((r) => {
        ratingTotalScore += r.score;
      });
      const averageScore = rating.responses.length > 0 ? ratingTotalScore / rating.responses.length : 0;

      return {
        customerName: rating.customerName,
        feedbackText: rating.feedbackText,
        isComplaint: rating.isComplaint,
        averageScore,
        createdAt: rating.createdAt,
      };
    });

    return NextResponse.json({
      totalRatings,
      averageRating: Math.round(averageRating * 10) / 10,
      satisfactionPercentage,
      totalComplaints,
      trendData,
      recentRatings,
    });
  } catch (error) {
    console.error('Error fetching agent stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    );
  }
}