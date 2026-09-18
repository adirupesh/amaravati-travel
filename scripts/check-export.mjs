import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
const root = path.resolve("out");
const routes = [
  "",
  "about",
  "contact",
  "destinations",
  "packages",
  "planner",
  ...[
    "kerala-backwaters",
    "rajasthan-royal-trail",
    "himalayan-valleys",
    "bali-island-escape",
    "goa-coastal-days",
    "thailand-island-trail",
  ].map((s) => "packages/" + s),
];
let refs = 0;
for (const route of routes) {
  const file = path.join(root, route, "index.html");
  assert.ok(fs.existsSync(file), `Missing route ${route}`);
  const html = fs.readFileSync(file, "utf8");
  assert.equal(
    (html.match(/<h1[\s>]/g) || []).length,
    1,
    `${route}: expected one H1`,
  );
  assert.match(html, /<title>[^<]+<\/title>/);
  assert.match(html, /rel="canonical"/);
  for (const m of html.matchAll(/(?:href|src)="([^"#]+)"/g)) {
    const raw = m[1].split(/[?#]/)[0];
    if (!raw.startsWith("/")) continue;
    const target = path.join(root, decodeURIComponent(raw));
    assert.ok(
      fs.existsSync(target) || fs.existsSync(path.join(target, "index.html")),
      `Missing local reference ${raw} from ${route}`,
    );
    refs++;
  }
}
for (const name of ["404.html", "sitemap.xml", "robots.txt", "favicon.svg"])
  assert.ok(fs.existsSync(path.join(root, name)), `Missing ${name}`);
const sitemap = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
assert.equal((sitemap.match(/<loc>/g) || []).length, routes.length);
assert.ok(!sitemap.includes("https://example.com"));
console.log(
  `Export verified: ${routes.length} page routes, ${refs} local references, canonical URLs, sitemap, robots, favicon and 404.`,
);
