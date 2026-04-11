import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const videoUrl = searchParams.get('url');

    if (!videoUrl) {
      return new NextResponse('Missing "url" parameter', { status: 400 });
    }

    const decodedUrl = decodeURIComponent(videoUrl);

    // Security: Only allow videos from whitelisted domains
    const allowedDomains = ['hsrtiles.in', 'res.cloudinary.com'];
    const isAllowed = allowedDomains.some(domain => decodedUrl.includes(domain));
    
    if (!isAllowed) {
      return new NextResponse('Domain not allowed', { status: 403 });
    }

    // Fetch the video with timeout and optimized request headers
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000); // 30s timeout

    const response = await fetch(decodedUrl, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'video/mp4, video/webm, video/*',
      },
      // Don't follow redirects excessively
      redirect: 'follow',
    });

    clearTimeout(timeout);

    if (!response.ok) {
      return new NextResponse(`Failed to fetch video: ${response.status}`, { 
        status: response.status 
      });
    }

    const contentType = response.headers.get('content-type') || 'video/mp4';
    const contentLength = response.headers.get('content-length');

    // Stream the response directly (don't load into memory)
    const headers = new Headers();
    headers.set('Content-Type', contentType);
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
    headers.set('Cache-Control', 'public, max-age=604800, immutable'); // 1 week cache
    headers.set('X-Content-Type-Options', 'nosniff');
    headers.set('Accept-Ranges', 'bytes');
    
    if (contentLength) {
      headers.set('Content-Length', contentLength);
    }

    return new NextResponse(response.body, {
      status: 200,
      headers,
    });
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      return new NextResponse('Request timeout', { status: 504 });
    }
    return new NextResponse('Proxy error', { status: 500 });
  }
}
