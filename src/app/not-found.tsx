import Link from "next/link";
export default function NotFound() {
  return (
    <section className="section container contact-teaser">
      <p className="eyebrow">A SMALL DETOUR</p>
      <h1>This page has wandered off.</h1>
      <p>Let’s get you back to your next journey.</p>
      <Link className="button" href="/packages/">
        Explore packages
      </Link>
    </section>
  );
}
