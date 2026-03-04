import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function PUT(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    // Only ADMIN can promote users
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized. Only admins can promote users.' },
        { status: 401 }
      );
    }

    const { role, departmentId } = await request.json();

    // Validate role
    const validRoles = ['EMPLOYEE', 'AGENT', 'HOD', 'ADMIN'];
    if (!role || !validRoles.includes(role)) {
      return NextResponse.json(
        { error: 'Invalid role. Must be one of: EMPLOYEE, AGENT, HOD, ADMIN' },
        { status: 400 }
      );
    }

    // Find the user
    const user = await prisma.user.findUnique({
      where: { id: params.userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Update user role and optionally department
    const updateData: any = {
      role,
    };

    if (departmentId) {
      updateData.departmentId = departmentId;
    }

    const updatedUser = await prisma.user.update({
      where: { id: params.userId },
      data: updateData,
      include: {
        department: {
          select: { name: true },
        },
      },
    });

    // Create notification for the user about their promotion
    await prisma.notification.create({
      data: {
        userId: params.userId,
        title: 'Role Updated',
        message: `Your role has been updated to ${role}${departmentId ? ' and assigned to a department' : ''}.`,
        type: 'system',
      },
    });

    return NextResponse.json({
      message: 'User role updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Error promoting user:', error);
    return NextResponse.json(
      { error: 'Failed to promote user' },
      { status: 500 }
    );
  }
}
