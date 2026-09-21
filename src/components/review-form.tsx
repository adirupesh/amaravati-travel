"use client";

import { FormEvent, useState } from "react";
import { packages } from "@/lib/data";

export function ReviewForm({
  defaultPackage = "",
}: {
  defaultPackage?: string;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");
    const form = event.currentTarget;
    const response = await fetch("/api/reviews/", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(Object.fromEntries(new FormData(form))),
    }).catch(() => null);
    const result = response
      ? ((await response.json().catch(() => ({}))) as { error?: string })
      : {};
    if (!response?.ok) {
      setStatus("error");
      setMessage(
        result.error || "We could not submit your review. Please try again.",
      );
      return;
    }
    form.reset();
    setStatus("sent");
    setMessage(
      "Thank you. Your review is awaiting approval before it appears publicly.",
    );
  }

  return (
    <form className="review-form" onSubmit={submit}>
      <div className="review-form-heading">
        <p className="eyebrow">SHARE YOUR EXPERIENCE</p>
        <h2>Tell future travellers what stayed with you.</h2>
        <p>
          Reviews are checked before publication. Your email is used for
          moderation and is never displayed.
        </p>
      </div>
      <div className="form-grid">
        <label className="field">
          <span>Package</span>
          <select name="packageSlug" defaultValue={defaultPackage} required>
            <option value="" disabled>
              Select a package
            </option>
            {packages.map((trip) => (
              <option key={trip.slug} value={trip.slug}>
                {trip.title}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>Rating</span>
          <select name="rating" defaultValue="5" required>
            <option value="5">5 — Excellent</option>
            <option value="4">4 — Very good</option>
            <option value="3">3 — Good</option>
            <option value="2">2 — Fair</option>
            <option value="1">1 — Disappointing</option>
          </select>
        </label>
        <label className="field">
          <span>Your name</span>
          <input
            name="reviewerName"
            autoComplete="name"
            minLength={2}
            maxLength={60}
            required
          />
        </label>
        <label className="field">
          <span>Email</span>
          <input
            name="reviewerEmail"
            type="email"
            autoComplete="email"
            maxLength={120}
            required
          />
        </label>
        <label className="field">
          <span>
            Travel month <small>(optional)</small>
          </span>
          <input name="travelMonth" type="month" />
        </label>
        <label className="field review-honeypot" aria-hidden="true">
          <span>Website</span>
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
        <label className="field field-full">
          <span>Review title</span>
          <input name="title" minLength={4} maxLength={80} required />
        </label>
        <label className="field field-full">
          <span>Your review</span>
          <textarea
            name="body"
            rows={6}
            minLength={30}
            maxLength={1200}
            required
          />
        </label>
      </div>
      <label className="review-consent">
        <input name="consent" type="checkbox" value="yes" required />
        <span>
          I confirm this is my own experience and agree that my name and review
          may be published.
        </span>
      </label>
      <button className="button" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Submitting…" : "Submit review for approval"}
      </button>
      <p
        className={`status-message ${status === "error" ? "status-error" : ""}`}
        aria-live="polite"
      >
        {message}
      </p>
    </form>
  );
}
