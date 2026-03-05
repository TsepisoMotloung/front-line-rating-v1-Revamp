import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Mark this route as dynamic (uses search params)
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query');
    const departmentId = searchParams.get('departmentId');

    if (query && query.trim() === '') {
      // If no query provided, return empty result
      return NextResponse.json([], { status: 200 });
    }

    // Build where clause: Show ALL agents OR employees from Client Services department
    const where: any = {
      status: 'APPROVED',
      name: { contains: query },
      OR: [
        { role: 'AGENT' }, // All agents from any department
        {
          // Employees only from Client Services department
          role: 'EMPLOYEE',
          departmentId: departmentId, // Client Services dept ID
        },
      ],
    };

    // Search for agents
    const agents = await prisma.user.findMany({
      where,
      select: {
        id: true,
        name: true,
        email: true,
        employeeId: true,
        department: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
      take: 50, // Limit results
    });

    return NextResponse.json(agents);
  } catch (error) {
    console.error('Error searching agents:', error);
    return NextResponse.json([], { status: 200 });
  }
}