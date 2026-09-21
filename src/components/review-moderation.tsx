"use client";

import { useState } from "react";
import { packages } from "@/lib/data";
import { PendingReview, displayReviewDate, stars } from "@/lib/reviews";

export function ReviewModeration({
  initialReviews,
}: {
  initialReviews: PendingReview[];
}) {
  const [reviews, setReviews] = useState(initialReviews);
  const [message, setMessage] = useState("");
  async function moderate(id: number, action: "approve" | "reject") {
    setMessage("");
    const response = await fetch("/api/reviews/moderate/", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ id, action }),
    });
    if (!response.ok) {
      setMessage("The moderation action failed. Please try again.");
      return;
    }
    setReviews((current) => current.filter((review) => review.id !== id));
    setMessage(
      action === "approve"
        ? "Review approved and published."
        : "Review rejected.",
    );
  }
  return (
    <div className="moderation-list">
      <p className="status-message" aria-live="polite">
        {message}
      </p>
      {reviews.length ? (
        reviews.map((review) => (
          <article className="moderation-card" key={review.id}>
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
            <p className="card-eyebrow">
              {packages.find((trip) => trip.slug === review.packageSlug)
                ?.title || review.packageSlug}
            </p>
            <h2>{review.title}</h2>
            <p>{review.body}</p>
            <dl>
              <div>
                <dt>Name</dt>
                <dd>{review.reviewerName}</dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>{review.reviewerEmail}</dd>
              </div>
              {review.travelMonth && (
                <div>
                  <dt>Travel month</dt>
                  <dd>{review.travelMonth}</dd>
                </div>
              )}
            </dl>
            <div className="moderation-actions">
              <button
                className="button"
                type="button"
                onClick={() => moderate(review.id, "approve")}
              >
                Approve and publish
              </button>
              <button
                className="button button-outline"
                type="button"
                onClick={() => moderate(review.id, "reject")}
              >
                Reject
              </button>
            </div>
          </article>
        ))
      ) : (
        <div className="reviews-empty">
          <h2>No reviews awaiting approval.</h2>
          <p>New submissions will appear here.</p>
        </div>
      )}
    </div>
  );
}
