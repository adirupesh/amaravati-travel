import Link from "next/link";
import { Clock, ArrowUpRight, MapPin } from "lucide-react";
import { TravelImage } from "./travel-image";
import { TravelPackage } from "@/lib/data";
import { money } from "@/lib/site";
export function PackageCard({ trip }: { trip: TravelPackage }) {
  return (
    <article className="package-card">
      <Link
        className="card-image"
        href={`/packages/${trip.slug}/`}
        aria-label={`Explore ${trip.title}`}
      >
        <TravelImage src={trip.image} alt={trip.alt} />
        <span className="image-tag">{trip.label}</span>
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
            <Clock size={14} />
            {trip.days} days / {trip.days - 1} nights
          </span>
          <span>
            <MapPin size={14} />
            {trip.route.split(" · ").length} stops
          </span>
        </div>
        <div className="card-bottom">
          <div>
            <span>From / person</span>
            <strong>{money(trip.price)}</strong>
          </div>
          <Link
            className="button package-view-button"
            href={`/packages/${trip.slug}/`}
            aria-label={`View package: ${trip.title}`}
          >
            View package <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
