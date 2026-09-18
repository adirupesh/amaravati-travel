export type PlannerDay = {
  date: string;
  destination: string;
  activities: string;
  notes: string;
};
export type TripPlan = {
  version: 1;
  name: string;
  start: string;
  end: string;
  travellers: number;
  days: PlannerDay[];
};
export const blankPlan: TripPlan = {
  version: 1,
  name: "",
  start: "",
  end: "",
  travellers: 2,
  days: [],
};
const dayMs = 86400000;
export function dateNumber(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return NaN;
  const ms = Date.parse(value + "T00:00:00Z");
  if (!Number.isFinite(ms) || new Date(ms).toISOString().slice(0, 10) !== value)
    return NaN;
  return ms;
}
export function buildDays(
  start: string,
  end: string,
  existing: PlannerDay[] = [],
): PlannerDay[] {
  const a = dateNumber(start),
    b = dateNumber(end);
  const count = (b - a) / dayMs + 1;
  if (!Number.isInteger(count) || count < 1 || count > 30)
    throw new Error(
      "Choose a valid date range of 1–30 days, with the end date on or after the start date.",
    );
  return Array.from({ length: count }, (_, i) => {
    const date = new Date(a + i * dayMs).toISOString().slice(0, 10);
    return (
      existing.find((d) => d.date === date) || {
        date,
        destination: "",
        activities: "",
        notes: "",
      }
    );
  });
}
export function validatePlan(value: unknown): TripPlan {
  if (!value || typeof value !== "object")
    throw new Error("This saved plan could not be read.");
  const p = value as TripPlan;
  if (
    p.version !== 1 ||
    typeof p.name !== "string" ||
    p.name.length > 100 ||
    !p.name.trim() ||
    typeof p.start !== "string" ||
    typeof p.end !== "string" ||
    !Number.isInteger(p.travellers) ||
    p.travellers < 1 ||
    p.travellers > 30 ||
    !Array.isArray(p.days)
  )
    throw new Error("This saved plan is not valid.");
  const expected = buildDays(p.start, p.end);
  if (
    p.days.length !== expected.length ||
    p.days.some(
      (d, i) =>
        !d ||
        d.date !== expected[i].date ||
        typeof d.destination !== "string" ||
        d.destination.length > 150 ||
        typeof d.activities !== "string" ||
        d.activities.length > 2000 ||
        typeof d.notes !== "string" ||
        d.notes.length > 2000,
    )
  )
    throw new Error("This saved plan is not valid.");
  return {
    version: 1,
    name: p.name,
    start: p.start,
    end: p.end,
    travellers: p.travellers,
    days: p.days.map((d) => ({
      date: d.date,
      destination: d.destination,
      activities: d.activities,
      notes: d.notes,
    })),
  };
}
export const displayDate = (date: string) =>
  new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date + "T00:00:00Z"));
