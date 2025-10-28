import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user.role !== 'HOD' && session.user.role !== 'ADMIN')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const departmentId = session.user.role === 'HOD' ? session.user.departmentId : null;

    const where: any = {};
    if (departmentId) {
      where.departmentId = departmentId;
    }

    const questions = await prisma.question.findMany({
      where,
      orderBy: {
        order: 'asc',
      },
      include: {
        department: {
          select: {
            name: true,
          },
        },
      },
    });

    return NextResponse.json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch questions' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'HOD') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const departmentId = session.user.departmentId;
    if (!departmentId) {
      return NextResponse.json(
        { error: 'No department assigned' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { questionText, isActive } = body;

    if (!questionText) {
      return NextResponse.json(
        { error: 'Question text is required' },
        { status: 400 }
      );
    }

    // Get the highest order number
    const maxOrder = await prisma.question.findFirst({
      where: { departmentId },
      orderBy: { order: 'desc' },
      select: { order: true },
    });

    const question = await prisma.question.create({
      data: {
        departmentId,
        questionText,
        isActive: isActive !== undefined ? isActive : true,
        order: (maxOrder?.order || 0) + 1,
      },
    });

    return NextResponse.json(question, { status: 201 });
  } catch (error) {
    console.error('Error creating question:', error);
    return NextResponse.json(
      { error: 'Failed to create question' },
      { status: 500 }
    );
  }
}