export const site = {
  name: "Amaravati Tours & Travel",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://amaravati-journeys-atelier.psri38157.chatgpt.site",
  description:
    "Thoughtfully planned journeys across India and beyond. Explore sample travel packages and build your own day-by-day itinerary.",
};
export const links = [
  { href: "/", label: "Home" },
  { href: "/packages/", label: "Packages" },
  { href: "/weekly-deals/", label: "Weekly deals" },
  { href: "/destinations/", label: "Destinations" },
  { href: "/planner/", label: "Itinerary planner" },
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
];
export const money = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
