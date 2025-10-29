import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query');
    const departmentId = searchParams.get('departmentId');

    // Build where clause
    const where: any = {
      role: 'AGENT',
      status: 'APPROVED',
    };

    if (query && query.trim() !== '') {
      // Only search by agent name (case-insensitive depending on DB collation)
      where.name = { contains: query };
    } else {
      // If no query provided, return empty result to avoid returning all agents
      return NextResponse.json([], { status: 200 });
    }

    // departmentId is ignored for this simplified name-only search

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