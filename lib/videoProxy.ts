/**
 * Video URL utilities for CORS-safe video loading
 * 
 * Converts external video URLs to proxy URLs that serve through
 * the same origin, bypassing CORS restrictions.
 */

export function getProxyVideoUrl(externalUrl: string): string {
  // If it's already a relative URL or from the same origin, return as-is
  if (!externalUrl.startsWith('http')) {
    return externalUrl;
  }

  // If it's already being proxied, don't double-proxy
  if (externalUrl.includes('/api/video')) {
    return externalUrl;
  }

  // ImageKit is CORS-enabled and a CDN - use directly without proxy
  if (externalUrl.includes('ik.imagekit.io')) {
    return externalUrl;
  }

  // Convert external URL to proxy URL
  const encodedUrl = encodeURIComponent(externalUrl);
  return `/api/video?url=${encodedUrl}`;
}

/**
 * Check if a URL needs proxying (external domain)
 */
export function isExternalVideo(url: string): boolean {
  if (!url.startsWith('http')) return false;

  try {
    const urlObj = new URL(url);
    const currentOrigin = typeof window !== 'undefined' 
      ? window.location.origin 
      : 'http://localhost:3000';

    return !urlObj.href.startsWith(currentOrigin);
  } catch {
    return false;
  }
}

/**
 * Batch convert multiple video URLs
 */
export function getProxyVideoUrls(urls: string[]): string[] {
  return urls.map(url => getProxyVideoUrl(url));
}
