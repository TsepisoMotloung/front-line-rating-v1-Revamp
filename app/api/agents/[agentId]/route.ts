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
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Check if user is approved and is either an AGENT or EMPLOYEE from Client Services
    if (agent.status !== 'APPROVED') {
      return NextResponse.json(
        { error: 'User not available' },
        { status: 404 }
      );
    }

    // Only allow AGENT role OR EMPLOYEE role from Client Services department
    if (agent.role === 'EMPLOYEE' && !agent.department?.name?.toLowerCase().includes('client services')) {
      return NextResponse.json(
        { error: 'User not available for rating' },
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