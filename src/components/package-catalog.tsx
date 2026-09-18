"use client";
import { useEffect, useMemo, useState } from "react";
import { Search, Compass } from "lucide-react";
import { categories, packages } from "@/lib/data";
import { PackageCard } from "./package-card";
export function PackageCatalog() {
  const [category, setCategory] = useState("All packages");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("recommended");
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setQuery(
      (params.get("q") || params.get("destination") || "").slice(0, 100),
    );
  }, []);
  const results = useMemo(() => {
    let trips = packages.filter(
      (p) =>
        (category === "All packages" || p.categories.includes(category)) &&
        `${p.title} ${p.region} ${p.country} ${p.route} ${p.categories.join(" ")}`
          .toLowerCase()
          .includes(query.trim().toLowerCase()),
    );
    if (sort === "price") trips = [...trips].sort((a, b) => a.price - b.price);
    if (sort === "duration") trips = [...trips].sort((a, b) => a.days - b.days);
    return trips;
  }, [category, query, sort]);
  return (
    <>
      <div className="filter-bar" role="group" aria-label="Package categories">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className="filter-button"
            aria-pressed={category === c}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="catalog-search">
        <Search size={20} aria-hidden="true" />
        <label className="sr-only" htmlFor="package-query">
          Search packages
        </label>
        <input
          id="package-query"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search a place or journey"
          maxLength={100}
        />
      </div>
      <div className="catalog-toolbar">
        <span aria-live="polite">
          {results.length} {results.length === 1 ? "journey" : "journeys"} to
          explore
        </span>
        <label>
          Sort by{" "}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            aria-label="Sort packages"
          >
            <option value="recommended">Our selection</option>
            <option value="price">Price: low to high</option>
            <option value="duration">Duration: shortest first</option>
          </select>
        </label>
      </div>
      {results.length ? (
        <div className="package-grid">
          {results.map((p) => (
            <PackageCard trip={p} key={p.slug} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <Compass size={34} />
          <h2>A different direction?</h2>
          <p>
            Try another destination or clear the filters to see every journey.
          </p>
          <button
            className="button"
            onClick={() => {
              setCategory("All packages");
              setQuery("");
            }}
          >
            Clear filters
          </button>
        </div>
      )}
      <p className="form-note">
        Prices are illustrative, per person on twin sharing, and exclude flights
        unless stated. These sample trips are not live booking offers.
      </p>
    </>
  );
}
