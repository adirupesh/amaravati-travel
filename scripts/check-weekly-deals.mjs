import assert from "node:assert/strict";
import {
  getDealWeek,
  dealPrice,
  dealSelections,
} from "../src/lib/weekly-deals.ts";
import { packages } from "../src/lib/data.ts";
const before = getDealWeek(new Date("2026-09-20T18:29:59Z"));
const after = getDealWeek(new Date("2026-09-20T18:30:00Z"));
assert.equal(before.start, "2026-09-14");
assert.equal(before.end, "2026-09-20");
assert.equal(after.start, "2026-09-21");
assert.equal(after.end, "2026-09-27");
assert.notEqual(before.selection, after.selection);
assert.equal(getDealWeek(new Date("2026-09-26T12:00:00Z")).start, after.start);
assert.equal(getDealWeek(new Date("2024-01-01T00:00:00Z")).start, "2024-01-01");
assert.equal(dealPrice(24900, 10), 22410);
for (const selection of dealSelections) {
  assert.equal(selection.length, 3);
  assert.equal(new Set(selection.map((d) => d.slug)).size, 3);
  for (const deal of selection) {
    const trip = packages.find((p) => p.slug === deal.slug);
    assert.ok(trip);
    assert.ok(deal.discount > 0 && deal.discount < 100);
    const price = dealPrice(trip.price, deal.discount);
    assert.ok(Number.isInteger(price) && price > 0 && price < trip.price);
  }
}
console.log(
  "Weekly deal checks passed: India-time Monday boundary, week rotation, valid packages and savings.",
);
