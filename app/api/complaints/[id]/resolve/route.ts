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

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized - Not logged in' }, { status: 401 });
    }

    if (session.user.role !== 'HOD' && session.user.role !== 'ADMIN') {
      return NextResponse.json({ 
        error: `Unauthorized - Only HOD and Admin can resolve complaints. Your role: ${session.user.role}` 
      }, { status: 403 });
    }

    // Validate ID format
    if (!params.id || typeof params.id !== 'string') {
      return NextResponse.json(
        { error: 'Invalid complaint ID' },
        { status: 400 }
      );
    }

    const complaint = await prisma.rating.findUnique({
      where: { id: params.id },
      include: {
        agent: {
          select: { id: true, name: true, email: true }
        },
        department: {
          select: { id: true, name: true }
        },
      },
    });

    if (!complaint) {
      return NextResponse.json(
        { error: 'Complaint not found' },
        { status: 404 }
      );
    }

    if (!complaint.isComplaint) {
      return NextResponse.json(
        { error: 'This rating is not marked as a complaint' },
        { status: 400 }
      );
    }

    if (complaint.complaintStatus === 'RESOLVED') {
      return NextResponse.json(
        { error: 'This complaint is already resolved' },
        { status: 400 }
      );
    }

    // If HOD, verify it's their department
    if (session.user.role === 'HOD') {
      if (!complaint.departmentId || complaint.departmentId !== session.user.departmentId) {
        return NextResponse.json(
          { error: 'You can only resolve complaints from your department' },
          { status: 403 }
        );
      }
    }

    const now = new Date();
    const updated = await prisma.rating.update({
      where: { id: params.id },
      data: {
        complaintStatus: 'RESOLVED',
        resolvedAt: now,
        resolvedBy: session.user.id,
      },
      include: {
        agent: {
          select: { id: true, name: true, email: true }
        },
        department: {
          select: { id: true, name: true }
        },
      },
    });

    // Create notification for agent (only if agentId exists)
    if (complaint.agentId) {
      await prisma.notification.create({
        data: {
          userId: complaint.agentId,
          title: 'Complaint Resolved',
          message: `A complaint from ${complaint.customerName} has been marked as resolved by ${session.user.name}`,
          type: 'complaint',
        },
      });
    }

    return NextResponse.json({
      message: 'Complaint resolved successfully',
      complaint: updated,
    });
  } catch (error) {
    console.error('Error resolving complaint:', error);
    return NextResponse.json(
      { error: 'Failed to resolve complaint. Please try again.' },
      { status: 500 }
    );
  }
}