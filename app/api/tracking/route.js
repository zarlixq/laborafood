import { NextResponse } from "next/server";
import { createAnonClient } from "@/lib/supabase";

const CODE_RE = /^LF-\d{4}-\d{4}$/;

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code")?.trim().toUpperCase();

  if (!code || !CODE_RE.test(code)) {
    return NextResponse.json({ error: "invalid_code" }, { status: 400 });
  }

  try {
    const supabase = createAnonClient();
    const { data, error } = await supabase
      .from("samples_public")
      .select(
        "tracking_code, product_name, analysis_type, status, received_at, estimated_completion, completed_at, report_url"
      )
      .eq("tracking_code", code)
      .maybeSingle();

    if (error) {
      console.error("[tracking]", error);
      return NextResponse.json({ error: "server_error" }, { status: 500 });
    }
    if (!data) {
      return NextResponse.json({ error: "not_found" }, { status: 404 });
    }
    return NextResponse.json(data, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (err) {
    console.error("[tracking unexpected]", err);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
