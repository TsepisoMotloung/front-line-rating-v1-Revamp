import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

// Get user's own ratings (given or received depending on role)
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

    let ratings
    let total

    if (session.user.role === 'AGENT') {
      // Agents see ratings they've received
      [ratings, total] = await Promise.all([
        prisma.rating.findMany({
          where: { agentId: session.user.id },
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
          where: { agentId: session.user.id },
        }),
      ])
    } else {
      // Regular users see ratings they've given
      [ratings, total] = await Promise.all([
        prisma.rating.findMany({
          where: {
            OR: [
              { customerContact: session.user.email },
              { customerName: session.user.name },
            ],
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
          },
        }),
      ])
    }

    return NextResponse.json({
      ratings,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        page,
        limit,
      },
    })
  } catch (error) {
    console.error('Error fetching ratings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch ratings' },
      { status: 500 }
    )
  }
}