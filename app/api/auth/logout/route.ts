import { NextResponse } from 'next/server';

export async function POST() {
  // In a token-based (Bearer) auth system, logout is usually handled client-side
  // by simply deleting the token from local storage.
  // We provide this endpoint for completeness and possible future server-side invalidation.
  return NextResponse.json({ success: true, message: 'Logged out successfully' });
}
