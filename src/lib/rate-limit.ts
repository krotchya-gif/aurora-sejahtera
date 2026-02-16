/**
 * Simple in-memory rate limiting untuk protect API routes dari abuse
 * Menggunakan Map untuk store request counts per IP
 */

import { NextResponse } from "next/server";

// Store untuk track request counts: IP -> { count, resetTime }
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

/**
 * Clean up expired entries setiap 1 jam
 */
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of rateLimitStore.entries()) {
    if (now > value.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}, 60 * 60 * 1000); // 1 hour

/**
 * Check rate limit untuk request
 * @param request - NextRequest object
 * @param maxRequests - Maximum requests allowed
 * @param windowMs - Time window in milliseconds
 * @returns NextResponse if rate limit exceeded, null otherwise
 */
export function checkRateLimit(
  request: Request,
  maxRequests: number = 100,
  windowMs: number = 15 * 60 * 1000 // 15 minutes default
): NextResponse | null {
  // Get IP dari request headers
  const forwarded = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const ip = forwarded?.split(",")[0] || realIp || "unknown";

  const now = Date.now();
  const key = `${ip}`;

  // Get atau create entry untuk IP ini
  let entry = rateLimitStore.get(key);

  // Reset jika window sudah expired
  if (!entry || now > entry.resetTime) {
    entry = {
      count: 0,
      resetTime: now + windowMs,
    };
    rateLimitStore.set(key, entry);
  }

  // Increment count
  entry.count++;

  // Check if limit exceeded
  if (entry.count > maxRequests) {
    const retryAfter = Math.ceil((entry.resetTime - now) / 1000);
    return NextResponse.json(
      {
        success: false,
        message: "Too many requests. Please try again later.",
        retryAfter: `${retryAfter} seconds`,
      },
      {
        status: 429,
        headers: {
          "Retry-After": retryAfter.toString(),
        },
      }
    );
  }

  return null; // Rate limit not exceeded
}

/**
 * Stricter rate limit untuk write operations (POST, PUT, DELETE)
 * Limit: 30 requests per 15 minutes
 */
export function checkWriteRateLimit(request: Request): NextResponse | null {
  return checkRateLimit(request, 30, 15 * 60 * 1000);
}

/**
 * Rate limit untuk read operations (GET)
 * Limit: 100 requests per 15 minutes
 */
export function checkReadRateLimit(request: Request): NextResponse | null {
  return checkRateLimit(request, 100, 15 * 60 * 1000);
}

/**
 * Strict rate limit untuk public form submissions
 * Limit: 10 requests per hour
 */
export function checkFormRateLimit(request: Request): NextResponse | null {
  return checkRateLimit(request, 10, 60 * 60 * 1000); // 1 hour
}
