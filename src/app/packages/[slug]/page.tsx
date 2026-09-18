import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, MapPin, Calendar, ArrowUpRight, Check } from "lucide-react";
import { packages } from "@/lib/data";
import { money } from "@/lib/site";
import { whatsappLink } from "@/lib/whatsapp";
import { TravelImage } from "@/components/travel-image";
export const dynamicParams = false;
export function generateStaticParams() {
  return packages.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = packages.find((p) => p.slug === slug);
  return p
    ? {
        title: p.title,
        description: `${p.days} days exploring ${p.route}. ${p.summary}`,
        alternates: { canonical: `/packages/${p.slug}/` },
        openGraph: { title: p.title, description: p.summary },
      }
    : { title: "Journey not found" };
}
export default async function PackageDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = packages.find((p) => p.slug === slug);
  if (!p) notFound();
  return (
    <div className="container">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link> / <Link href="/packages/">Packages</Link> /{" "}
        <span aria-current="page">{p.region}</span>
      </nav>
      <div className="detail-top">
        <p className="eyebrow">
          {p.country.toUpperCase()} · {p.label.toUpperCase()}
        </p>
        <h1>{p.title}</h1>
        <p>{p.summary}</p>
      </div>
      <div className="detail-hero">
        <TravelImage
          src={p.image}
          alt={p.alt}
          priority
          sizes="(max-width: 1240px) 100vw, 1200px"
        />
      </div>
      <div className="detail-grid">
        <div className="detail-content">
          <div className="detail-facts">
            <span>
              <Clock size={18} />
              {p.days} days / {p.days - 1} nights
            </span>
            <span>
              <MapPin size={18} />
              {p.route}
            </span>
            <span>
              <Calendar size={18} />
              {p.season}
            </span>
          </div>
          <h2>The moments to look forward to</h2>
          <ul className="check-list">
            {p.highlights.map((h) => (
              <li key={h}>
                <Check size={18} />
                {h}
              </li>
            ))}
          </ul>
          <h2>Your journey, day by day</h2>
          <p className="section-description">
            A suggested route with space to make it your own.
          </p>
          <div className="itinerary-list">
            {p.itinerary.map((d, i) => (
              <article className="itinerary-item" key={d.title}>
                <span className="day-number" aria-label={`Day ${i + 1}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3>{d.title}</h3>
                  <p>{d.description}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="inclusion-grid">
            <section className="info-panel">
              <h3>Included in this sample</h3>
              <ul>
                <li>Accommodation on twin sharing</li>
                <li>Daily breakfast</li>
                <li>Scheduled arrival and departure transfers</li>
                <li>Experiences listed in the itinerary</li>
              </ul>
            </section>
            <section className="info-panel">
              <h3>Plan separately</h3>
              <ul>
                <li>Flights and travel insurance</li>
                <li>Visas, if applicable</li>
                <li>Meals other than breakfast</li>
                <li>Optional activities and personal expenses</li>
              </ul>
            </section>
          </div>
          <p className="form-note">
            The route, accommodation, and activities are illustrative. Final
            arrangements depend on availability, weather, and your preferences.
          </p>
        </div>
        <aside className="booking-panel" aria-label="Plan this journey">
          <p>Sample starting price / person</p>
          <strong>{money(p.price)}</strong>
          <h2>Make this journey yours.</h2>
          <p>
            Tell us what you have in mind, or use this route as the start of
            your own plan.
          </p>
          <a
            className="button"
            href={whatsappLink(p.title)}
            target="_blank"
            rel="noopener noreferrer"
          >
            Enquire on WhatsApp <ArrowUpRight size={17} aria-hidden="true" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <Link
            className="button button-outline"
            href={`/planner/?package=${p.slug}`}
          >
            Use in itinerary planner
          </Link>
          <p className="booking-note">
            Illustrative pricing. This website does not take payments or confirm
            bookings.
          </p>
        </aside>
      </div>
    </div>
  );
}
