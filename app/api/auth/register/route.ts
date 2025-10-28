import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import prisma from '@/lib/prisma';
import { generateRandomString } from '@/lib/utils';
import { sendVerificationEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password, phone, employeeId, role, departmentId } = body;

    // Validate required fields
    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      );
    }

    // Check if employee ID already exists
    if (employeeId) {
      const existingEmployeeId = await prisma.user.findUnique({
        where: { employeeId },
      });

      if (existingEmployeeId) {
        return NextResponse.json(
          { error: 'Employee ID already in use' },
          { status: 400 }
        );
      }
    }

    // Validate department for non-admin roles
    if (role !== 'ADMIN' && !departmentId) {
      return NextResponse.json(
        { error: 'Department is required for this role' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate verification token
    const verificationToken = generateRandomString(32);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        phone,
        employeeId,
        departmentId: role !== 'ADMIN' ? departmentId : null,
        status: 'PENDING',
        verificationToken,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
      },
    });

    // Send verification email (optional - can be sent after approval)
    try {
      await sendVerificationEmail(email, verificationToken);
    } catch (emailError) {
      console.error('Failed to send verification email:', emailError);
      // Don't fail registration if email fails
    }

    // Create notification for admin
    await prisma.notification.create({
      data: {
        userId: user.id,
        title: 'New Registration',
        message: `New ${role.toLowerCase()} registration from ${name}`,
        type: 'system',
      },
    });

    return NextResponse.json(
      {
        message: 'Registration successful. Awaiting admin approval.',
        user,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'An error occurred during registration' },
      { status: 500 }
    );
  }
}