"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, Clock, Tag } from "lucide-react";
import { TravelImage } from "./travel-image";
import { packages } from "@/lib/data";
import { money } from "@/lib/site";
import { displayDate } from "@/lib/planner";
import {
  DealWeek,
  getDealWeek,
  dealSelections,
  dealPrice,
} from "@/lib/weekly-deals";
export function WeeklyDeals({ initialWeek }: { initialWeek: DealWeek }) {
  const [week, setWeek] = useState(initialWeek);
  useEffect(() => {
    const refresh = () => {
      const next = getDealWeek();
      setWeek((current) => (current.start === next.start ? current : next));
    };
    refresh();
    const timer = window.setInterval(refresh, 60000);
    document.addEventListener("visibilitychange", refresh);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, []);
  return (
    <>
      <div className="weekly-period">
        <div>
          <p className="eyebrow">THIS WEEK’S SELECTION</p>
          <h2>A little saving. A new adventure.</h2>
        </div>
        <p className="weekly-dates">
          <CalendarDays size={19} aria-hidden="true" />
          <span>
            <time dateTime={week.start}>{displayDate(week.start)}</time> –{" "}
            <time dateTime={week.end}>{displayDate(week.end)}</time>
            <small>New selection every Monday · India time</small>
          </span>
        </p>
      </div>
      <p className="weekly-demo-note">
        <Tag size={18} aria-hidden="true" />
        <span>
          Sample weekly deals. Prices and savings are illustrative; these are
          not live booking offers.
        </span>
      </p>
      <div className="package-grid">
        {dealSelections[week.selection].map((deal) => {
          const trip = packages.find((p) => p.slug === deal.slug);
          if (!trip) return null;
          const price = dealPrice(trip.price, deal.discount);
          return (
            <article className="package-card weekly-card" key={trip.slug}>
              <Link
                className="card-image"
                href={`/packages/${trip.slug}/`}
                aria-label={`View ${trip.title}`}
              >
                <TravelImage src={trip.image} alt={trip.alt} />
                <span className="weekly-discount">
                  {deal.discount}% sample saving
                </span>
              </Link>
              <div className="card-content">
                <p className="card-eyebrow">
                  {trip.region} <span>· {trip.country}</span>
                </p>
                <h3>
                  <Link href={`/packages/${trip.slug}/`}>{trip.title}</Link>
                </h3>
                <p>{trip.summary}</p>
                <div className="card-meta">
                  <span>
                    <Clock size={16} aria-hidden="true" />
                    {trip.days} days / {trip.days - 1} nights
                  </span>
                </div>
                <div className="weekly-price">
                  <span>
                    Sample regular price <del>{money(trip.price)}</del>
                  </span>
                  <div>
                    <strong>{money(price)}</strong>
                    <span>per person</span>
                  </div>
                  <p>Save {money(trip.price - price)} per person</p>
                </div>
                <Link
                  className="button weekly-enquiry"
                  href={`/contact/?package=${trip.slug}&deal=${week.start}`}
                  aria-label={`Enquire about the weekly deal for ${trip.title}`}
                >
                  Enquire about this deal{" "}
                  <ArrowUpRight size={17} aria-hidden="true" />
                </Link>
                <Link
                  className="weekly-details-link"
                  href={`/packages/${trip.slug}/`}
                >
                  See itinerary & inclusions
                </Link>
              </div>
            </article>
          );
        })}
      </div>
      <section className="weekly-terms" aria-labelledby="weekly-terms-title">
        <h2 id="weekly-terms-title">Before you plan</h2>
        <ul>
          <li>
            The displayed selection runs Monday to Sunday in Asia/Kolkata time.
            It refreshes automatically each Monday when you visit this page.
          </li>
          <li>
            Sample prices are per person, on twin sharing. Flights, visas,
            insurance, optional activities, and personal expenses are excluded.
          </li>
          <li>
            Weekly selection dates are not travel dates. Your preferred travel
            dates and final arrangements must be confirmed separately.
          </li>
          <li>
            This site prepares an enquiry draft. It does not confirm
            availability, take payments, or reserve a trip.
          </li>
        </ul>
      </section>
    </>
  );
}
