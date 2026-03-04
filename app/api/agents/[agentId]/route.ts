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
      },
      select: {
        id: true,
        name: true,
        employeeId: true,
        role: true,
        status: true,
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

    // Check if agent is approved and has AGENT role
    if (agent.role !== 'AGENT' || agent.status !== 'APPROVED') {
      return NextResponse.json(
        { error: 'Agent not available' },
        { status: 404 }
      );
    }

    // Return agent without role/status fields
    return NextResponse.json({
      id: agent.id,
      name: agent.name,
      employeeId: agent.employeeId,
      department: agent.department,
    });
  } catch (error) {
    console.error('Error fetching agent:', error);
    return NextResponse.json(
      { error: 'Failed to fetch agent' },
      { status: 500 }
    );
  }
}