import Link from "next/link";
import { Compass } from "lucide-react";
export function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="Amaravati Tours and Travel home"
      className={`brand ${light ? "brand-light" : ""}`}
    >
      <Compass size={43} strokeWidth={1.2} aria-hidden="true" />
      <span>
        Amaravati<small>TOURS & TRAVEL</small>
      </span>
    </Link>
  );
}
