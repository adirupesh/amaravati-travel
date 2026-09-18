import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { PackageCatalog } from "@/components/package-catalog";
export const metadata: Metadata = {
  title: "Tour packages",
  description:
    "Explore sample journeys in Kerala, Rajasthan, the Himalayas, Goa, Bali, and Thailand.",
  alternates: { canonical: "/packages/" },
};
export default function Packages() {
  return (
    <>
      <PageIntro
        eyebrow="EXPLORE AT YOUR OWN PACE"
        title="Find your next chapter."
        description="From a few days by the sea to a journey through the mountains. Find a trip that feels like you."
      />
      <section className="section container">
        <PackageCatalog />
      </section>
    </>
  );
}
