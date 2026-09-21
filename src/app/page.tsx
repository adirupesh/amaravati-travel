import Link from "next/link";
import {
  ArrowUpRight,
  ArrowRight,
  Compass,
  Route,
  Heart,
  Check,
} from "lucide-react";
import { TravelImage } from "@/components/travel-image";
import { PackageCard } from "@/components/package-card";
import { SectionHeading } from "@/components/section-heading";
import { HomeSearch } from "@/components/home-search";
import { packages, photos, destinations } from "@/lib/data";
export const metadata = { alternates: { canonical: "/" } };
export default function Home() {
  return (
    <>
      <section className="hero">
        <TravelImage
          src={photos.mountain}
          alt="Mountain peaks rising into the clouds"
          priority
          sizes="100vw"
        />
        <div className="hero-shade" />
        <div className="container hero-content">
          <p className="eyebrow">INDIA & BEYOND. BEAUTIFULLY PLANNED.</p>
          <h1>
            Go somewhere
            <br />
            <em>that stays with you.</em>
          </h1>
          <p className="hero-description">
            From quiet backwaters to wide-open mountain skies.
            <br className="desktop-break" /> Discover journeys with a little
            more heart.
          </p>
          <div className="hero-actions">
            <Link href="/packages/" className="button button-gold">
              Explore packages <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
            <Link href="/planner/" className="hero-secondary">
              Plan your trip <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <HomeSearch />
          <div className="hero-footnote">
            <span>YOUR NEXT CHAPTER STARTS HERE</span>
            <span className="hero-location">A little mountain inspiration</span>
          </div>
        </div>
      </section>
      <div className="promise-strip">
        <div className="container promise-inner">
          <span>
            <Compass size={20} /> Local insight, thoughtful journeys
          </span>
          <span>
            <Route size={20} /> Flexible plans, your pace
          </span>
          <span>
            <Heart size={20} /> Personal attention, from start to finish
          </span>
        </div>
      </div>
      <section
        className="section container recent-journey"
        aria-labelledby="recent-journey-title"
      >
        <div className="recent-journey-copy">
          <p className="eyebrow">RECENT TRAVEL MOMENTS</p>
          <h2 id="recent-journey-title">
            The experience begins before you arrive.
          </h2>
          <p>
            A recent arrival in Kerala: tropical skies, warm air, and the first
            glimpse of a journey about to unfold.
          </p>
          <div className="recent-journey-notes" aria-label="Travel information">
            <div>
              <strong>Featured experience</strong>
              <span>Kerala coast and backwaters</span>
            </div>
            <div>
              <strong>Good time to travel</strong>
              <span>October to March</span>
            </div>
            <div>
              <strong>Travel style</strong>
              <span>Slow days, local food, quiet waterways</span>
            </div>
          </div>
          <p className="media-credit">
            Illustrative travel footage courtesy of{" "}
            <a
              href="https://coverr.co/videos/plane-landing-in-india-fm7myit2et"
              target="_blank"
              rel="noopener noreferrer"
            >
              Coverr
            </a>
            .
          </p>
        </div>
        <figure className="recent-journey-media">
          <video
            controls
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="A plane arriving in Kerala, India"
          >
            <source src="/recent-travel-india.mp4" type="video/mp4" />
            Your browser does not support this travel video.
          </video>
          <figcaption>
            Arriving in Kerala · a 17-second travel moment
          </figcaption>
        </figure>
      </section>
      <section className="section container">
        <SectionHeading
          eyebrow="A FEW OF OUR FAVOURITES"
          title="Great journeys begin here."
          description="A taste of what’s possible. Every trip can be shaped around you."
          href="/packages/"
        />
        <div className="package-grid">
          {packages.slice(0, 3).map((p) => (
            <PackageCard trip={p} key={p.slug} />
          ))}
        </div>
      </section>
      <section className="destination-section section">
        <div className="container">
          <SectionHeading
            eyebrow="FIND YOUR KIND OF WONDER"
            title="Different places. Endless possibilities."
            href="/destinations/"
            linkText="Explore destinations"
          />
          <div className="destination-grid">
            {[
              destinations[0],
              destinations[1],
              destinations[3],
              destinations[4],
            ].map((d, i) => (
              <Link
                href={`/packages/?destination=${encodeURIComponent(d.name)}`}
                className={`destination-card destination-${i}`}
                key={d.name}
              >
                <TravelImage src={d.image} alt={d.alt} />
                <div className="destination-shade" />
                <div className="destination-content">
                  <span>{d.country}</span>
                  <h3>{d.name}</h3>
                  <span className="destination-discover">
                    Discover <ArrowUpRight size={17} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section container story-grid">
        <div className="story-image">
          <TravelImage
            src={photos.kerala}
            alt="A green valley in Kerala"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <span className="story-image-note">Take the scenic route.</span>
        </div>
        <div className="story-copy">
          <p className="eyebrow">THE AMARAVATI WAY</p>
          <h2>
            Less planning.
            <br />
            <em>More being there.</em>
          </h2>
          <p>
            The best journeys leave room for unexpected moments. A conversation
            over chai. A quiet path. One more sunset.
          </p>
          <p>
            We bring the details together so you can enjoy the place, the
            people, and the time you’ve made for yourself.
          </p>
          <ul className="check-list">
            <li>
              <Check size={18} />
              Routes that balance discovery and downtime
            </li>
            <li>
              <Check size={18} />
              Stays and experiences chosen with care
            </li>
            <li>
              <Check size={18} />
              Plans built around your interests
            </li>
          </ul>
          <Link className="text-link" href="/about/">
            Get to know us <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
      <section className="planner-banner">
        <div className="container planner-banner-inner">
          <div>
            <p className="eyebrow">A LITTLE STRUCTURE. A LOT OF POSSIBILITY.</p>
            <h2>Your trip. Your way.</h2>
            <p>
              Map out your days with our free itinerary planner.
              <br />
              Add the places, experiences, and little details that matter.
            </p>
          </div>
          <Link href="/planner/" className="button button-gold">
            Build your itinerary <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
      <section className="section container contact-teaser">
        <p className="eyebrow">LET’S MAKE IT HAPPEN</p>
        <h2>Where are you dreaming of?</h2>
        <p>Tell us your travel ideas. We’ll help you find a way there.</p>
        <Link href="/contact/" className="button">
          Start a conversation <ArrowUpRight size={18} />
        </Link>
      </section>
    </>
  );
}
