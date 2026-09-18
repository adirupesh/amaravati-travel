import type { Metadata } from "next";
import Link from "next/link";
import { Compass, Heart, Route, ArrowUpRight } from "lucide-react";
import { PageIntro } from "@/components/page-intro";
import { TravelImage } from "@/components/travel-image";
import { photos } from "@/lib/data";
export const metadata: Metadata = {
  title: "About us",
  description: "Our approach to thoughtful, personal travel planning.",
  alternates: { canonical: "/about/" },
};
export default function About() {
  return (
    <>
      <PageIntro
        eyebrow="THE PEOPLE BEHIND THE PLANS"
        title="Travel with a little more heart."
        description="We believe a great journey is personal. It starts with listening and leaves room for discovery."
      />
      <section className="section container story-grid">
        <div className="story-copy">
          <p className="eyebrow">ROOTED IN AMARAVATI. OPEN TO THE WORLD.</p>
          <h2>
            Good travel starts
            <br />
            with understanding you.
          </h2>
          <p>
            Some travellers want the first trail out of town. Others want a slow
            breakfast and a view. Most want a bit of both.
          </p>
          <p>
            Our approach is simple: understand what matters to you, bring the
            practical details together, and build a journey that feels right.
            Across India and beyond, we put people and places at the centre of
            every plan.
          </p>
          <Link className="text-link" href="/contact/">
            Tell us your travel story <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="story-image">
          <TravelImage
            src={photos.rajasthan}
            alt="Traditional architecture in Jaipur"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </section>
      <section
        className="container about-values"
        aria-label="Our travel values"
      >
        {[
          {
            icon: Compass,
            title: "A sense of place",
            copy: "Routes that give you time to discover local culture, landscapes, and everyday life.",
          },
          {
            icon: Route,
            title: "Room to be flexible",
            copy: "A clear plan, with enough breathing space to enjoy a moment you didn’t expect.",
          },
          {
            icon: Heart,
            title: "Personal by design",
            copy: "Your interests, your pace, and your priorities guide the way we put a journey together.",
          },
        ].map((v) => (
          <article className="value-card" key={v.title}>
            <v.icon size={28} />
            <h2>{v.title}</h2>
            <p>{v.copy}</p>
          </article>
        ))}
      </section>
      <section className="planner-banner">
        <div className="container planner-banner-inner">
          <div>
            <p className="eyebrow">YOUR IDEAS. A THOUGHTFUL PLAN.</p>
            <h2>Let’s find your next journey.</h2>
          </div>
          <Link href="/packages/" className="button button-gold">
            Explore packages <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
