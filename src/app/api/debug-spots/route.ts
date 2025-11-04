import { NextResponse } from "next/server";
import { SPOT_META_EN } from "../../en/spots/[slug]/data";
import { SPOT_META_JA } from "../../ja/spots/[slug]/data";

export async function GET() {
  return NextResponse.json({ en: SPOT_META_EN, ja: SPOT_META_JA });
}
