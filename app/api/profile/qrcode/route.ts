import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const searchParams = request.nextUrl.searchParams;
    const agentId = searchParams.get('agentId');

    if (!session && !agentId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const idToUse = agentId || session?.user.id;

    if (!idToUse) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    // Generate rating URL
    const baseUrl = process.env.APP_URL;
    const ratingUrl = `${baseUrl}/rate/${idToUse}`;

    // Use QRCode.js to generate QR code
    // For production, you might want to use a QR code service or library
    // For now, we'll use a free API service
    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(ratingUrl)}`;
    console.log(qrApiUrl);
    // Fetch the QR code image
    const response = await fetch(qrApiUrl);
    
    if (!response.ok) {
      throw new Error('Failed to generate QR code');
    }

    const imageBuffer = await response.arrayBuffer();

    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=86400', // Cache for 1 day
      },
    });
  } catch (error) {
    console.error('Error generating QR code:', error);
    return NextResponse.json(
      { error: 'Failed to generate QR code' },
      { status: 500 }
    );
  }
}