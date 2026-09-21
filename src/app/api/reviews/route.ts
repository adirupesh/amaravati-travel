import { env } from "cloudflare:workers";
import { NextResponse } from "next/server";
import { packages } from "@/lib/data";

const allowedPackages = new Set(packages.map((trip) => trip.slug));

function text(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

async function submitterKey(request: Request, email: string) {
  const address = request.headers.get("cf-connecting-ip") || "unknown";
  const bytes = new TextEncoder().encode(`${address}|${email.toLowerCase()}`);
  const hash = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .slice(0, 32);
}

export async function POST(request: Request) {
  if (!env.DB)
    return NextResponse.json(
      { error: "Reviews are temporarily unavailable." },
      { status: 503 },
    );
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin)
    return NextResponse.json({ error: "Invalid request." }, { status: 403 });
  const data = (await request.json().catch(() => null)) as Record<
    string,
    unknown
  > | null;
  if (!data || text(data.website, 200))
    return NextResponse.json({ ok: true }, { status: 202 });

  const packageSlug = text(data.packageSlug, 80);
  const reviewerName = text(data.reviewerName, 60);
  const reviewerEmail = text(data.reviewerEmail, 120);
  const title = text(data.title, 80);
  const body = text(data.body, 1200);
  const travelMonth = text(data.travelMonth, 7) || null;
  const rating = Number(data.rating);
  if (
    !allowedPackages.has(packageSlug) ||
    reviewerName.length < 2 ||
    !/^\S+@\S+\.\S+$/.test(reviewerEmail) ||
    title.length < 4 ||
    body.length < 30 ||
    !Number.isInteger(rating) ||
    rating < 1 ||
    rating > 5 ||
    data.consent !== "yes"
  ) {
    return NextResponse.json(
      { error: "Please complete every required field." },
      { status: 400 },
    );
  }
  const key = await submitterKey(request, reviewerEmail);
  const cutoff = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const recent = await env.DB.prepare(
    "SELECT COUNT(*) AS count FROM reviews WHERE submitter_key = ? AND created_at >= ?",
  )
    .bind(key, cutoff)
    .first<{ count: number }>();
  if ((recent?.count || 0) >= 3)
    return NextResponse.json(
      { error: "Please wait before submitting another review." },
      { status: 429 },
    );
  await env.DB.prepare(
    "INSERT INTO reviews (package_slug, reviewer_name, reviewer_email, rating, title, body, travel_month, status, submitter_key, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, 'pending', ?, ?)",
  )
    .bind(
      packageSlug,
      reviewerName,
      reviewerEmail,
      rating,
      title,
      body,
      travelMonth,
      key,
      new Date().toISOString(),
    )
    .run();
  return NextResponse.json({ ok: true }, { status: 201 });
}
