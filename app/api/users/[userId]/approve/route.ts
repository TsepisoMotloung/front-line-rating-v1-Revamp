import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { sendApprovalNotificationEmail } from '@/lib/email';

export async function PUT(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: params.userId },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const updatedUser = await prisma.user.update({
      where: { id: params.userId },
      data: { status: 'APPROVED' },
    });

    // Send approval email
    try {
      await sendApprovalNotificationEmail(user.email, user.name, true);
    } catch (emailError) {
      console.error('Failed to send approval email:', emailError);
    }

    // Create notification
    await prisma.notification.create({
      data: {
        userId: params.userId,
        title: 'Account Approved',
        message: 'Your account has been approved. You can now login to the system.',
        type: 'system',
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error approving user:', error);
    return NextResponse.json(
      { error: 'Failed to approve user' },
      { status: 500 }
    );
  }
}