import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

// GET all Alliance Insurance questions
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 403 }
      );
    }

    const questions = await prisma.allianceInsuranceQuestion.findMany({
      orderBy: { order: 'asc' },
    });

    return NextResponse.json(questions);
  } catch (error) {
    console.error('Error fetching Alliance Insurance questions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch questions' },
      { status: 500 }
    );
  }
}

// POST create a new Alliance Insurance question
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { questionText, order } = body;

    if (!questionText) {
      return NextResponse.json(
        { error: 'Question text is required' },
        { status: 400 }
      );
    }

    const question = await prisma.allianceInsuranceQuestion.create({
      data: {
        questionText,
        order: order ?? 0,
        isActive: true,
      },
    });

    return NextResponse.json(question, { status: 201 });
  } catch (error) {
    console.error('Error creating Alliance Insurance question:', error);
    return NextResponse.json(
      { error: 'Failed to create question' },
      { status: 500 }
    );
  }
}
