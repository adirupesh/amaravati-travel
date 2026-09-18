import assert from "node:assert/strict";
import { buildDays, validatePlan, dateNumber } from "../src/lib/planner.ts";
assert.equal(buildDays("2026-11-01", "2026-11-01").length, 1);
assert.deepEqual(
  buildDays("2024-02-28", "2024-03-01").map((d) => d.date),
  ["2024-02-28", "2024-02-29", "2024-03-01"],
);
assert.equal(buildDays("2026-03-07", "2026-03-10").length, 4);
assert.throws(() => buildDays("2026-11-06", "2026-11-01"));
assert.throws(() => buildDays("2026-01-01", "2026-01-31"));
assert.ok(Number.isNaN(dateNumber("2026-02-30")));
const days = buildDays("2026-11-01", "2026-11-03");
days[1].notes = "Keep this note";
assert.equal(
  buildDays("2026-11-02", "2026-11-04", days)[0].notes,
  "Keep this note",
);
const plan = {
  version: 1,
  name: "Kerala escape",
  start: "2026-11-01",
  end: "2026-11-03",
  travellers: 2,
  days,
};
assert.deepEqual(validatePlan(JSON.parse(JSON.stringify(plan))), plan);
assert.throws(() => validatePlan({ ...plan, travellers: 0 }));
assert.throws(() => validatePlan({ ...plan, days: [...days].reverse() }));
assert.throws(() =>
  validatePlan({
    ...plan,
    days: [{ ...days[0], notes: null }, ...days.slice(1)],
  }),
);
assert.throws(() => validatePlan({ version: 2 }));
console.log(
  "Planner checks passed: leap days, date bounds, preserved notes, and malformed imports.",
);
