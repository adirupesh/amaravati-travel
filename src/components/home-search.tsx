"use client";
import { Search, ArrowRight } from "lucide-react";
export function HomeSearch() {
  return (
    <form className="hero-search" action="/packages/" method="get">
      <Search size={22} aria-hidden="true" />
      <label className="sr-only" htmlFor="destination-search">
        Search destinations or packages
      </label>
      <input
        id="destination-search"
        name="q"
        placeholder="Where would you love to go?"
        maxLength={100}
      />
      <button type="submit">
        Find a journey <ArrowRight size={18} />
      </button>
    </form>
  );
}
