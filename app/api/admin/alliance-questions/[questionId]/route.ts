import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

// PUT update an Alliance Insurance question
export async function PUT(
  request: NextRequest,
  { params }: { params: { questionId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 403 }
      );
    }

    const questionId = params.questionId;
    const body = await request.json();
    const { questionText, order, isActive } = body;

    // Get the current question to check if order is changing
    const currentQuestion = await prisma.allianceInsuranceQuestion.findUnique({
      where: { id: questionId },
    });

    if (!currentQuestion) {
      return NextResponse.json(
        { error: 'Question not found' },
        { status: 404 }
      );
    }

    // If order is being changed and is different from current order
    if (order !== undefined && order !== currentQuestion.order) {
      // Find all questions with order >= new order (excluding current question)
      const conflictingQuestions = await prisma.allianceInsuranceQuestion.findMany({
        where: {
          order: {
            gte: order,
          },
          id: {
            not: questionId,
          },
        },
      });

      // Increment the order of all conflicting questions by 1
      for (const q of conflictingQuestions) {
        await prisma.allianceInsuranceQuestion.update({
          where: { id: q.id },
          data: { order: q.order + 1 },
        });
      }
    }

    const question = await prisma.allianceInsuranceQuestion.update({
      where: { id: questionId },
      data: {
        ...(questionText && { questionText }),
        ...(order !== undefined && { order }),
        ...(isActive !== undefined && { isActive }),
      },
    });

    return NextResponse.json(question);
  } catch (error: any) {
    console.error('Error updating Alliance Insurance question:', error);
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Question not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to update question' },
      { status: 500 }
    );
  }
}

// DELETE an Alliance Insurance question
export async function DELETE(
  request: NextRequest,
  { params }: { params: { questionId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 403 }
      );
    }

    const questionId = params.questionId;

    await prisma.allianceInsuranceQuestion.delete({
      where: { id: questionId },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting Alliance Insurance question:', error);
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Question not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to delete question' },
      { status: 500 }
    );
  }
}
