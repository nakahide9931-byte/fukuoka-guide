// src/app/api/debug-spots/route.ts
import { NextResponse } from 'next/server';
import { spots } from '../../ja/spots/data';

export const dynamic = 'force-dynamic';

export async function GET() {
  const slugs = (spots as any[]).map((s) => String((s as any).slug));
  return NextResponse.json({ count: slugs.length, slugs });
}
