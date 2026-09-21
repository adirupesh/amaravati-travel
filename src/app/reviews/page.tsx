import type { Metadata } from "next";
import Link from "next/link";
import { env } from "cloudflare:workers";
import { PageIntro } from "@/components/page-intro";
import { ReviewForm } from "@/components/review-form";
import { packages } from "@/lib/data";
import { displayReviewDate, PublicReview, stars } from "@/lib/reviews";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Traveller reviews",
  description:
    "Read approved traveller reviews by package and share your Amaravati Tours & Travel experience.",
  alternates: { canonical: "/reviews/" },
};

export default async function ReviewsPage({
  searchParams,
}: {
  searchParams: Promise<{ package?: string }>;
}) {
  const selected = (await searchParams).package || "";
  const validSelected = packages.some((trip) => trip.slug === selected)
    ? selected
    : "";
  let reviews: PublicReview[] = [];
  let unavailable = false;
  try {
    if (!env.DB) throw new Error("DB unavailable");
    const query = validSelected
      ? env.DB.prepare(
          "SELECT id, package_slug AS packageSlug, reviewer_name AS reviewerName, rating, title, body, travel_month AS travelMonth, created_at AS createdAt FROM reviews WHERE status = 'approved' AND package_slug = ? ORDER BY created_at DESC LIMIT 100",
        ).bind(validSelected)
      : env.DB.prepare(
          "SELECT id, package_slug AS packageSlug, reviewer_name AS reviewerName, rating, title, body, travel_month AS travelMonth, created_at AS createdAt FROM reviews WHERE status = 'approved' ORDER BY created_at DESC LIMIT 100",
        );
    reviews = (await query.all<PublicReview>()).results;
  } catch {
    unavailable = true;
  }
  const tripName = (slug: string) =>
    packages.find((trip) => trip.slug === slug)?.title || slug;
  return (
    <>
      <PageIntro
        eyebrow="TRAVELLER STORIES"
        title="Experiences, shared honestly."
        description="Read approved reviews from travellers, or tell us about a journey you took with Amaravati."
      />
      <section className="section container reviews-layout">
        <div className="reviews-list">
          <div className="reviews-toolbar">
            <div>
              <p className="eyebrow">APPROVED REVIEWS</p>
              <h2>
                {validSelected ? tripName(validSelected) : "All journeys"}
              </h2>
            </div>
            <form action="/reviews/" method="get">
              <label>
                <span className="sr-only">Filter by package</span>
                <select name="package" defaultValue={validSelected}>
                  <option value="">All packages</option>
                  {packages.map((trip) => (
                    <option key={trip.slug} value={trip.slug}>
                      {trip.title}
                    </option>
                  ))}
                </select>
              </label>
              <button className="button button-small" type="submit">
                Filter
              </button>
            </form>
          </div>
          {unavailable ? (
            <div className="reviews-empty">
              <h3>Reviews are temporarily unavailable.</h3>
              <p>Please try again shortly.</p>
            </div>
          ) : reviews.length ? (
            reviews.map((review) => (
              <article className="review-card" key={review.id}>
                <div className="review-card-top">
                  <span
                    className="review-stars"
                    aria-label={`${review.rating} out of 5 stars`}
                  >
                    {stars(review.rating)}
                  </span>
                  <time dateTime={review.createdAt}>
                    {displayReviewDate(review.createdAt)}
                  </time>
                </div>
                <h3>{review.title}</h3>
                <p>{review.body}</p>
                <footer>
                  <strong>{review.reviewerName}</strong>
                  <span>·</span>
                  <Link href={`/packages/${review.packageSlug}/`}>
                    {tripName(review.packageSlug)}
                  </Link>
                  {review.travelMonth && (
                    <>
                      <span>·</span>
                      <span>Travelled {review.travelMonth}</span>
                    </>
                  )}
                </footer>
              </article>
            ))
          ) : (
            <div className="reviews-empty">
              <h3>No approved reviews here yet.</h3>
              <p>
                Be the first to share a genuine experience for this package.
              </p>
            </div>
          )}
        </div>
        <ReviewForm defaultPackage={validSelected} />
      </section>
    </>
  );
}
