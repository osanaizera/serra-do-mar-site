import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = process.env.CMS_BASE_URL || "";
  const apiKey = process.env.CMS_API_KEY || "";

  if (!baseUrl || !apiKey) {
    return NextResponse.json(
      {
        ok: false,
        cmsOk: false,
        message: "Missing CMS environment variables (CMS_BASE_URL or CMS_API_KEY)",
      },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(
      `${baseUrl.replace(/\/$/, "")}/api/public/content?limit=1`,
      {
        headers: { "x-api-key": apiKey },
        cache: "no-store",
      }
    );

    return NextResponse.json({
      ok: true,
      cmsOk: response.ok,
      message: response.ok
        ? "CMS reachable - Serra do Mar Engenharia"
        : `CMS error (HTTP ${response.status})`,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        cmsOk: false,
        message:
          error instanceof Error ? error.message : "Failed to reach CMS",
      },
      { status: 500 }
    );
  }
}
