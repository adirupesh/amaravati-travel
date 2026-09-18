import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageIntro } from "@/components/page-intro";
import { TravelImage } from "@/components/travel-image";
import { destinations } from "@/lib/data";
export const metadata: Metadata = {
  title: "Destinations",
  description: "Discover travel inspiration from India to Southeast Asia.",
  alternates: { canonical: "/destinations/" },
};
export default function Destinations() {
  return (
    <>
      <PageIntro
        eyebrow="FOLLOW YOUR CURIOSITY"
        title="The world, a little closer."
        description="Golden cities, green hills, and turquoise coastlines. Where will your curiosity take you?"
      />
      <section className="section container">
        <div className="destination-list">
          {destinations.map((d) => (
            <article className="destination-tile" key={d.name}>
              <div className="tile-image">
                <TravelImage src={d.image} alt={d.alt} />
              </div>
              <div className="tile-copy">
                <p className="eyebrow">{d.country}</p>
                <h2>{d.name}</h2>
                <p>{d.description}</p>
                <Link
                  className="text-link"
                  href={`/packages/?destination=${encodeURIComponent(d.name)}`}
                >
                  Explore journeys <ArrowUpRight size={17} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
