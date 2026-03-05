import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { agentId: string } }
) {
  try {
    // Get agent with department
    const agent = await prisma.user.findUnique({
      where: {
        id: params.agentId,
      },
      select: {
        departmentId: true,
        role: true,
        status: true,
      },
    });

    if (!agent) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Validate user is approved and is either AGENT or EMPLOYEE
    if (agent.status !== 'APPROVED') {
      return NextResponse.json(
        { error: 'User not available' },
        { status: 404 }
      );
    }

    if (!agent.departmentId) {
      return NextResponse.json(
        { error: 'Agent has no department' },
        { status: 404 }
      );
    }

    // Get active questions for the department
    const questions = await prisma.question.findMany({
      where: {
        departmentId: agent.departmentId,
        isActive: true,
      },
      select: {
        id: true,
        questionText: true,
        order: true,
      },
      orderBy: {
        order: 'asc',
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