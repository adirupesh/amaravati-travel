import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
export function SectionHeading({
  eyebrow,
  title,
  description,
  href,
  linkText = "View all packages",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  href?: string;
  linkText?: string;
}) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        {description && <p className="section-description">{description}</p>}
      </div>
      {href && (
        <Link href={href} className="text-link">
          {linkText} <ArrowUpRight size={18} />
        </Link>
      )}
    </div>
  );
}
