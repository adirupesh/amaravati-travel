import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { WeeklyDeals } from "@/components/weekly-deals";
import { getDealWeek } from "@/lib/weekly-deals";
export const metadata: Metadata = {
  title: "Weekly travel deals",
  description:
    "Explore a fresh weekly selection of sample trip deals across India and beyond, with clear prices, savings, and itineraries.",
  alternates: { canonical: "/weekly-deals/" },
};
export default function WeeklyDealsPage() {
  return (
    <>
      <PageIntro
        eyebrow="SOMETHING NEW, EVERY WEEK"
        title="Good journeys. A little less."
        description="Explore this week’s trip selection, find a little inspiration, and start planning your next escape."
      />
      <section className="section container">
        <WeeklyDeals initialWeek={getDealWeek()} />
      </section>
    </>
  );
}
