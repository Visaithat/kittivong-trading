import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // No real persistence here yet — kept as a stub so the UI flow works
    // end-to-end. Wire this to your CRM / email / DB when ready.
    if (!body || typeof body !== "object") {
      return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
    }
    return NextResponse.json({ ok: true, received: Object.keys(body) });
  } catch {
    return NextResponse.json({ ok: false, error: "parse" }, { status: 400 });
  }
}
