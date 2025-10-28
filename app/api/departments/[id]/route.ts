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

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, description, isActive } = body;

    const updated = await prisma.department.update({
      where: { id: params.id },
      data: {
        name,
        description,
        isActive,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating department:', error);
    return NextResponse.json(
      { error: 'Failed to update department' },
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

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if department has users
    const userCount = await prisma.user.count({
      where: { departmentId: params.id },
    });

    if (userCount > 0) {
      return NextResponse.json(
        { error: `Cannot delete department with ${userCount} assigned users. Reassign users first or deactivate the department.` },
        { status: 400 }
      );
    }

    await prisma.department.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'Department deleted successfully' });
  } catch (error) {
    console.error('Error deleting department:', error);
    return NextResponse.json(
      { error: 'Failed to delete department' },
      { status: 500 }
    );
  }
}