import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Brand } from "./brand";
import { links } from "@/lib/site";
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Brand light />
          <p>
            Thoughtfully planned.
            <br />
            Wonderfully experienced.
          </p>
          <span className="footer-location">
            <MapPin size={16} /> Amaravati, Andhra Pradesh, India
          </span>
        </div>
        <div>
          <h2>Explore</h2>
          {links.slice(1, 4).map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </div>
        <div>
          <h2>A little about us</h2>
          <Link href="/about/">Our approach</Link>
          <Link href="/contact/">Get in touch</Link>
          <Link href="/packages/">Find your next journey</Link>
        </div>
        <div>
          <h2>Have a journey in mind?</h2>
          <p>Let’s turn your travel ideas into a plan.</p>
          <Link className="footer-contact" href="/contact/">
            Talk to us <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Amaravati Tours & Travel</span>
        <span>Sample website · Illustrative packages and prices</span>
      </div>
    </footer>
  );
}
