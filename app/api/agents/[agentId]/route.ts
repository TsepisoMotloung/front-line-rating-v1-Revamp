import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { agentId: string } }
) {
  try {
    const agent = await prisma.user.findUnique({
      where: {
        id: params.agentId,
        role: 'AGENT',
        status: 'APPROVED',
      },
      select: {
        id: true,
        name: true,
        employeeId: true,
        department: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!agent) {
      return NextResponse.json(
        { error: 'Agent not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(agent);
  } catch (error) {
    console.error('Error fetching agent:', error);
    return NextResponse.json(
      { error: 'Failed to fetch agent' },
      { status: 500 }
    );
  }
}