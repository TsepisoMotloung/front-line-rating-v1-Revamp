import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import * as XLSX from 'xlsx';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { departmentId, userIds, startDate, endDate, includeRatings = true, includeComplaints = true } = body;

    const where: any = {};

    if (departmentId) where.departmentId = departmentId;
    if (userIds && Array.isArray(userIds) && userIds.length > 0) where.agentId = { in: userIds };

    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = new Date(startDate);
      if (endDate) where.createdAt.lte = new Date(endDate);
    }

    const workbook = XLSX.utils.book_new();

    if (includeRatings) {
      const ratings = await prisma.rating.findMany({
        where,
        include: {
          agent: { select: { id: true, name: true, employeeId: true } },
          department: { select: { id: true, name: true } },
          responses: { include: { question: { select: { questionText: true } } } },
        },
        orderBy: { createdAt: 'desc' },
      });

      const ratingRows = ratings.map((r) => ({
        id: r.id,
        agentName: r.agent?.name || null,
        agentEmployeeId: r.agent?.employeeId || null,
        department: r.department?.name || null,
        customerName: r.customerName,
        customerContact: r.customerContact,
        isAnonymous: r.isAnonymous,
        isComplaint: r.isComplaint,
        feedbackText: r.feedbackText,
        createdAt: r.createdAt.toISOString(),
        responses: JSON.stringify(r.responses.map((resp) => ({ question: resp.question.questionText, score: resp.score }))),
      }));

      const ratingsSheet = XLSX.utils.json_to_sheet(ratingRows);
      XLSX.utils.book_append_sheet(workbook, ratingsSheet, 'Ratings');
    }

    if (includeComplaints) {
      const complaintsWhere = { ...where, isComplaint: true };
      const complaints = await prisma.rating.findMany({
        where: complaintsWhere,
        include: {
          agent: { select: { id: true, name: true, employeeId: true } },
          department: { select: { id: true, name: true } },
          responses: { include: { question: { select: { questionText: true } } } },
        },
        orderBy: { createdAt: 'desc' },
      });

      const complaintRows = complaints.map((r) => ({
        id: r.id,
        agentName: r.agent?.name || null,
        agentEmployeeId: r.agent?.employeeId || null,
        department: r.department?.name || null,
        customerName: r.customerName,
        customerContact: r.customerContact,
        feedbackText: r.feedbackText,
        complaintStatus: r.complaintStatus,
        createdAt: r.createdAt.toISOString(),
        responses: JSON.stringify(r.responses.map((resp) => ({ question: resp.question.questionText, score: resp.score }))),
      }));

      const complaintsSheet = XLSX.utils.json_to_sheet(complaintRows);
      XLSX.utils.book_append_sheet(workbook, complaintsSheet, 'Complaints');
    }

    const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="report-${Date.now()}.xlsx"`,
      },
    });
  } catch (error) {
    console.error('Error generating report:', error);
    return NextResponse.json({ error: 'Failed to generate report' }, { status: 500 });
  }
}
