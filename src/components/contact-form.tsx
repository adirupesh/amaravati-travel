"use client";
import { useEffect, useState } from "react";
import { Download, ArrowUpRight } from "lucide-react";
import { packages } from "@/lib/data";
import { dateNumber, displayDate } from "@/lib/planner";
export function ContactForm() {
  const [trip, setTrip] = useState("");
  const [draft, setDraft] = useState("");
  const [dealWeek, setDealWeek] = useState("");
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("package");
    if (packages.some((p) => p.slug === slug)) setTrip(slug || "");
    const week = new URLSearchParams(window.location.search).get("deal") || "";
    if (Number.isFinite(dateNumber(week))) setDealWeek(week);
  }, []);
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const title =
      packages.find((p) => p.slug === trip)?.title || "A custom journey";
    setDraft(
      `Travel enquiry\n\nName: ${data.get("name")}\nEmail: ${data.get("email")}\nJourney: ${title}\nTravellers: ${data.get("travellers")}${dealWeek ? `\nReferenced sample weekly promotion: week of ${displayDate(dealWeek)}` : ""}\n\n${data.get("message")}\n`,
    );
  }
  function download() {
    const url = URL.createObjectURL(
      new Blob([draft], { type: "text/plain;charset=utf-8" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "travel-enquiry.txt";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return (
    <form
      className="form-panel"
      onSubmit={submit}
      onChange={() => setDraft("")}
    >
      {dealWeek && (
        <p className="weekly-demo-note">
          Sample promotion reference: week of {displayDate(dealWeek)}. Final
          pricing and availability require confirmation.
        </p>
      )}
      <div className="field-grid">
        <div className="field">
          <label htmlFor="contact-name">Your name *</label>
          <input
            id="contact-name"
            name="name"
            autoComplete="name"
            required
            maxLength={100}
            placeholder="Full name"
          />
        </div>
        <div className="field">
          <label htmlFor="contact-email">Email address *</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={200}
            placeholder="you@example.com"
          />
        </div>
      </div>
      <div className="field-grid">
        <div className="field">
          <label htmlFor="contact-trip">Journey you’re interested in</label>
          <select
            id="contact-trip"
            name="trip"
            value={trip}
            onChange={(e) => setTrip(e.target.value)}
          >
            <option value="">A custom journey</option>
            {packages.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.title}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="contact-travellers">Number of travellers *</label>
          <input
            id="contact-travellers"
            name="travellers"
            type="number"
            min={1}
            max={30}
            defaultValue={2}
            required
          />
        </div>
      </div>
      <div className="field">
        <label htmlFor="contact-message">Tell us about your plans *</label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          maxLength={3000}
          placeholder="Where would you like to go? Share your dates, interests, and any details that matter."
        />
      </div>
      <button className="button" type="submit">
        Prepare your enquiry <ArrowUpRight size={17} />
      </button>
      <p className="form-note">
        This is a demo contact form. It prepares a draft on your device; no
        enquiry is sent and no personal details are uploaded.
      </p>
      {draft && (
        <div className="status-message" role="status">
          <strong>Your enquiry draft is ready.</strong>
          <p>
            Download it to keep or share. It has not been sent to the agency.
          </p>
          <button
            type="button"
            className="button button-outline"
            onClick={download}
          >
            Download enquiry <Download size={16} />
          </button>
        </div>
      )}
    </form>
  );
}
