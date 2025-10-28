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

    if (!session || (session.user.role !== 'HOD' && session.user.role !== 'ADMIN')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const complaint = await prisma.rating.findUnique({
      where: { id: params.id },
      include: {
        agent: true,
      },
    });

    if (!complaint || !complaint.isComplaint) {
      return NextResponse.json(
        { error: 'Complaint not found' },
        { status: 404 }
      );
    }

    // If HOD, verify it's their department
    if (session.user.role === 'HOD' && complaint.departmentId !== session.user.departmentId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const updated = await prisma.rating.update({
      where: { id: params.id },
      data: {
        complaintStatus: 'RESOLVED',
      },
    });

    // Create notification for agent
    await prisma.notification.create({
      data: {
        userId: complaint.agentId,
        title: 'Complaint Resolved',
        message: `A complaint from ${complaint.customerName} has been marked as resolved`,
        type: 'complaint',
      },
    });

    return NextResponse.json({
      message: 'Complaint resolved successfully',
      complaint: updated,
    });
  } catch (error) {
    console.error('Error resolving complaint:', error);
    return NextResponse.json(
      { error: 'Failed to resolve complaint' },
      { status: 500 }
    );
  }
}