import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

// Get user's own complaints (submitted or received depending on role)
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const searchParams = new URL(request.url).searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit

    let complaints
    let total

    if (session.user.role === 'AGENT') {
      // Agents see complaints against them
      [complaints, total] = await Promise.all([
        prisma.rating.findMany({
          where: { 
            agentId: session.user.id,
            isComplaint: true
          },
          include: {
            responses: {
              include: {
                question: true,
              },
            },
            department: true,
          },
          orderBy: { createdAt: 'desc' },
          skip,
          take: limit,
        }),
        prisma.rating.count({
          where: { 
            agentId: session.user.id,
            isComplaint: true
          },
        }),
      ])
    } else {
      // Regular users see complaints they've submitted
      [complaints, total] = await Promise.all([
        prisma.rating.findMany({
          where: {
            OR: [
              { customerContact: session.user.email },
              { customerName: session.user.name },
            ],
            isComplaint: true
          },
          include: {
            responses: {
              include: {
                question: true,
              },
            },
            agent: {
              select: {
                name: true,
                department: true,
              },
            },
            department: true,
          },
          orderBy: { createdAt: 'desc' },
          skip,
          take: limit,
        }),
        prisma.rating.count({
          where: {
            OR: [
              { customerContact: session.user.email },
              { customerName: session.user.name },
            ],
            isComplaint: true
          },
        }),
      ])
    }

    return NextResponse.json({
      complaints,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        page,
        limit,
      },
    })
  } catch (error) {
    console.error('Error fetching complaints:', error)
    return NextResponse.json(
      { error: 'Failed to fetch complaints' },
      { status: 500 }
    )
  }
}