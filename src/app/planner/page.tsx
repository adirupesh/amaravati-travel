import type { Metadata } from "next";
import { ItineraryPlanner } from "@/components/itinerary-planner";
export const metadata: Metadata = {
  title: "Itinerary planner",
  description:
    "Build a day-by-day travel itinerary. Save a local draft, download a copy, or print your journey.",
  alternates: { canonical: "/planner/" },
};
export default function Planner() {
  return (
    <>
      <div className="planner-page-header container">
        <p className="eyebrow">YOUR JOURNEY, ONE DAY AT A TIME</p>
        <h1>Make room for adventure.</h1>
        <p>
          Set your dates. Add your places, experiences, and notes. Keep your
          plan on your device.
        </p>
      </div>
      <section className="section container planner-workspace">
        <ItineraryPlanner />
      </section>
    </>
  );
}
