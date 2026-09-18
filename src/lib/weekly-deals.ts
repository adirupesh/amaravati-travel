export type DealWeek = { start: string; end: string; selection: number };
const dayMs = 86400000;
const mondayEpoch = Date.UTC(1970, 0, 5);
export function getDealWeek(now: Date = new Date()): DealWeek {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const part = (name: string) =>
    Number(parts.find((p) => p.type === name)?.value);
  const today = Date.UTC(part("year"), part("month") - 1, part("day"));
  const monday = today - ((new Date(today).getUTCDay() + 6) % 7) * dayMs;
  return {
    start: new Date(monday).toISOString().slice(0, 10),
    end: new Date(monday + 6 * dayMs).toISOString().slice(0, 10),
    selection: ((Math.floor((monday - mondayEpoch) / (7 * dayMs)) % 2) + 2) % 2,
  };
}
export const dealSelections = [
  [
    { slug: "kerala-backwaters", discount: 10 },
    { slug: "rajasthan-royal-trail", discount: 8 },
    { slug: "bali-island-escape", discount: 12 },
  ],
  [
    { slug: "goa-coastal-days", discount: 10 },
    { slug: "himalayan-valleys", discount: 8 },
    { slug: "thailand-island-trail", discount: 12 },
  ],
];
export const dealPrice = (price: number, discount: number) =>
  Math.round((price * (100 - discount)) / 100);
