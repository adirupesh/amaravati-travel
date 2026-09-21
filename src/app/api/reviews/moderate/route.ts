import { env } from "cloudflare:workers";
import { NextResponse } from "next/server";

function isAdmin(request: Request) {
  const adminId = (env as unknown as { REVIEW_ADMIN_USER_ID?: string })
    .REVIEW_ADMIN_USER_ID;
  return Boolean(
    adminId && request.headers.get("oai-authenticated-user-id") === adminId,
  );
}

export async function POST(request: Request) {
  if (!env.DB)
    return NextResponse.json(
      { error: "Reviews are unavailable." },
      { status: 503 },
    );
  if (!isAdmin(request))
    return NextResponse.json({ error: "Not authorized." }, { status: 403 });
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin)
    return NextResponse.json({ error: "Invalid request." }, { status: 403 });
  const data = (await request.json().catch(() => null)) as Record<
    string,
    unknown
  > | null;
  const id = Number(data?.id);
  const action = typeof data?.action === "string" ? data.action : "";
  if (
    !Number.isInteger(id) ||
    id < 1 ||
    !["approve", "reject"].includes(action)
  )
    return NextResponse.json(
      { error: "Invalid moderation action." },
      { status: 400 },
    );
  const status = action === "approve" ? "approved" : "rejected";
  await env.DB.prepare(
    "UPDATE reviews SET status = ?, reviewer_email = '', moderated_at = ? WHERE id = ? AND status = 'pending'",
  )
    .bind(status, new Date().toISOString(), id)
    .run();
  return NextResponse.json({ ok: true });
}
