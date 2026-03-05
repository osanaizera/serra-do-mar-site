import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { verifySdcmsSignature } from "@/lib/sdcms-webhook";

export async function POST(req: NextRequest) {
  const secret = process.env.CMS_WEBHOOK_SECRET ?? "";
  if (!secret) {
    return NextResponse.json(
      { ok: false, error: "Missing CMS_WEBHOOK_SECRET" },
      { status: 500 }
    );
  }

  const timestamp = req.headers.get("x-sdcms-timestamp") ?? "";
  const signature = req.headers.get("x-sdcms-signature") ?? "";
  if (!timestamp || !signature) {
    return NextResponse.json(
      { ok: false, error: "Missing signature headers" },
      { status: 400 }
    );
  }

  // Replay protection: reject timestamps older than 10 minutes
  const ts = Number(timestamp);
  if (!Number.isFinite(ts)) {
    return NextResponse.json(
      { ok: false, error: "Invalid timestamp" },
      { status: 400 }
    );
  }
  const now = Math.floor(Date.now() / 1000);
  if (Math.abs(now - ts) > 10 * 60) {
    return NextResponse.json(
      { ok: false, error: "Stale timestamp" },
      { status: 401 }
    );
  }

  const body = await req.text();
  const ok = verifySdcmsSignature({
    secret,
    signatureHex: signature,
    timestamp,
    body,
  });
  if (!ok) {
    return NextResponse.json(
      { ok: false, error: "Invalid signature" },
      { status: 401 }
    );
  }

  let json: unknown;
  try {
    json = JSON.parse(body);
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const payload = json as {
    event: string;
    post?: { slug?: string };
    previousSlug?: string;
  };

  // Invalidate CMS fetch cache
  revalidateTag("cms-posts");

  // Public pages that depend on CMS posts
  revalidatePath("/");
  revalidatePath("/insights");
  if (payload.post?.slug) {
    revalidatePath(`/insights/${payload.post.slug}`);
  }
  if (payload.previousSlug) {
    revalidatePath(`/insights/${payload.previousSlug}`);
  }

  return NextResponse.json({
    ok: true,
    event: payload.event,
    slug: payload.post?.slug,
  });
}
