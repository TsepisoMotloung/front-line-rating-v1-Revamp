import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = req.nextUrl.searchParams;
    const raterId = searchParams.get('raterId');
    const ratedId = searchParams.get('ratedId');
    const category = searchParams.get('category');

    let whereClause: any = {};

    if (raterId) whereClause.raterId = raterId;
    if (ratedId) whereClause.ratedId = ratedId;
    if (category) whereClause.category = category;

    const ratings = await prisma.internalRating.findMany({
      where: whereClause,
      include: {
        rater: {
          select: { id: true, name: true, email: true, role: true },
        },
        rated: {
          select: { id: true, name: true, email: true, role: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(ratings);
  } catch (error) {
    console.error('Error fetching internal ratings:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await req.json();

    const { ratedId, category, score, feedbackText, isAnonymous } = data;

    if (!ratedId || !category || !score) {
      return NextResponse.json(
        { error: 'Missing required fields: ratedId, category, score' },
        { status: 400 }
      );
    }

    if (score < 1 || score > 5) {
      return NextResponse.json(
        { error: 'Score must be between 1 and 5' },
        { status: 400 }
      );
    }

    // Check if rated user exists and is not the same as rater
    const ratedUser = await prisma.user.findUnique({
      where: { id: ratedId },
    });

    if (!ratedUser) {
      return NextResponse.json({ error: 'Rated user not found' }, { status: 404 });
    }

    if (ratedId === session.user.id) {
      return NextResponse.json(
        { error: 'You cannot rate yourself' },
        { status: 400 }
      );
    }

    // Check if already rated this user in this category (to prevent duplicate ratings)
    const existingRating = await prisma.internalRating.findFirst({
      where: {
        raterId: session.user.id,
        ratedId,
        category,
      },
    });

    if (existingRating) {
      // Update instead of creating duplicate
      const updatedRating = await prisma.internalRating.update({
        where: { id: existingRating.id },
        data: {
          score,
          feedbackText,
          isAnonymous,
        },
        include: {
          rater: {
            select: { id: true, name: true, email: true, role: true },
          },
          rated: {
            select: { id: true, name: true, email: true, role: true },
          },
        },
      });
      return NextResponse.json(updatedRating);
    }

    const internalRating = await prisma.internalRating.create({
      data: {
        raterId: session.user.id,
        ratedId,
        category,
        score,
        feedbackText: feedbackText || null,
        isAnonymous: isAnonymous || false,
      },
      include: {
        rater: {
          select: { id: true, name: true, email: true, role: true },
        },
        rated: {
          select: { id: true, name: true, email: true, role: true },
        },
      },
    });

    return NextResponse.json(internalRating, { status: 201 });
  } catch (error) {
    console.error('Error creating internal rating:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
