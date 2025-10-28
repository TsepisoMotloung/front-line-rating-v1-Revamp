import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'HOD') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { questionText, isActive } = body;

    // Verify question belongs to HOD's department
    const question = await prisma.question.findUnique({
      where: { id: params.id },
    });

    if (!question || question.departmentId !== session.user.departmentId) {
      return NextResponse.json(
        { error: 'Question not found' },
        { status: 404 }
      );
    }

    const updated = await prisma.question.update({
      where: { id: params.id },
      data: {
        questionText,
        isActive,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating question:', error);
    return NextResponse.json(
      { error: 'Failed to update question' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'HOD') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify question belongs to HOD's department
    const question = await prisma.question.findUnique({
      where: { id: params.id },
    });

    if (!question || question.departmentId !== session.user.departmentId) {
      return NextResponse.json(
        { error: 'Question not found' },
        { status: 404 }
      );
    }

    // Check if question has responses
    const responseCount = await prisma.response.count({
      where: { questionId: params.id },
    });

    if (responseCount > 0) {
      return NextResponse.json(
        { error: 'Cannot delete question with existing responses. Deactivate it instead.' },
        { status: 400 }
      );
    }

    await prisma.question.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'Question deleted successfully' });
  } catch (error) {
    console.error('Error deleting question:', error);
    return NextResponse.json(
      { error: 'Failed to delete question' },
      { status: 500 }
    );
  }
}