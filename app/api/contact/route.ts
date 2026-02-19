import { NextResponse } from "next/server";

const GOOGLE_SHEET_URL =
  "https://script.google.com/macros/s/AKfycbxFTH53O0i_c92Xff_wDKZjSZsOjkMGUfVM0ZHb7bIjq3mNLDS-loE5p5jnmBXNAQCJ7g/exec";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    await fetch(GOOGLE_SHEET_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      redirect: "follow",
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to write to sheet" }, { status: 500 });
  }
}
