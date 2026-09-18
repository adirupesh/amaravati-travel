"use client";
import { useEffect, useRef, useState } from "react";
import {
  CalendarDays,
  ArrowRight,
  Download,
  Save,
  Printer,
  RotateCcw,
  Upload,
} from "lucide-react";
import { packages } from "@/lib/data";
import {
  blankPlan,
  buildDays,
  displayDate,
  validatePlan,
  TripPlan,
  PlannerDay,
} from "@/lib/planner";
const storageKey = "amaravati-trip-v1";
type Registry = {
  registerTool: (
    tool: {
      name: string;
      description: string;
      inputSchema: object;
      annotations: object;
      execute: (input: unknown) => unknown;
    },
    options: { signal: AbortSignal },
  ) => void | Promise<void>;
};
export function ItineraryPlanner() {
  const [plan, setPlan] = useState<TripPlan>(blankPlan);
  const [source, setSource] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const result = useRef<HTMLDivElement>(null);
  const current = useRef(plan);
  current.current = plan;
  useEffect(() => {
    try {
      setSaved(!!localStorage.getItem(storageKey));
    } catch {
      /* Storage may be disabled; downloads remain available. */
    }
    const slug = new URLSearchParams(window.location.search).get("package");
    const trip = packages.find((p) => p.slug === slug);
    if (trip) {
      setSource(trip.slug);
      setPlan((p) => ({ ...p, name: trip.title }));
      setMessage(
        `Use ${trip.title} as your starting point. Choose your dates to build the days.`,
      );
    }
  }, []);
  useEffect(() => {
    const context = (document as Document & { modelContext?: Registry })
      .modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    try {
      void Promise.resolve(
        context.registerTool(
          {
            name: "read_current_itinerary",
            description:
              "Read the itinerary currently visible in this planner. Does not save or change it.",
            inputSchema: {
              type: "object",
              properties: {},
              additionalProperties: false,
            },
            annotations: { readOnlyHint: true, untrustedContentHint: true },
            execute(input) {
              if (
                !input ||
                typeof input !== "object" ||
                Object.keys(input).length
              )
                throw new Error("Expected an empty object.");
              return current.current;
            },
          },
          { signal: lifecycle.signal },
        ),
      ).catch(() => {});
    } catch {
      /* Browsers without supported registration still use the regular UI. */
    }
    return () => lifecycle.abort();
  }, []);
  function clearMessages() {
    setMessage("");
    setError("");
  }
  function generate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    clearMessages();
    try {
      const form = e.currentTarget;
      const value = (id: string) =>
        (form.querySelector(`#${id}`) as HTMLInputElement | HTMLSelectElement)
          .value;
      const details = {
        name: value("plan-name"),
        start: value("plan-start"),
        end: value("plan-end"),
        travellers: Number(value("plan-travellers")),
      };
      const trip = packages.find((p) => p.slug === value("plan-source"));
      const days = buildDays(details.start, details.end, plan.days);
      const filled = days.map((d, i) =>
        d.destination || d.activities || d.notes
          ? d
          : {
              ...d,
              destination: trip?.overnights[i] || "",
              activities:
                trip && trip.itinerary[i]
                  ? `${trip.itinerary[i].title}: ${trip.itinerary[i].description}`
                  : "",
            },
      );
      const next = validatePlan({ ...plan, ...details, days: filled });
      setPlan(next);
      setMessage(
        `${days.length} days ready to personalise. Save your draft to keep it on this device.`,
      );
      requestAnimationFrame(() =>
        result.current?.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
            .matches
            ? "instant"
            : "smooth",
          block: "start",
        }),
      );
    } catch (e) {
      setError((e as Error).message);
    }
  }
  function editDay(
    index: number,
    key: keyof Omit<PlannerDay, "date">,
    value: string,
  ) {
    clearMessages();
    setPlan((p) => ({
      ...p,
      days: p.days.map((d, i) => (i === index ? { ...d, [key]: value } : d)),
    }));
  }
  function validCurrent() {
    const validated = validatePlan(plan);
    return validated;
  }
  function save() {
    clearMessages();
    try {
      const value = validCurrent();
      localStorage.setItem(storageKey, JSON.stringify(value));
      setSaved(true);
      setMessage(
        "Draft saved on this browser and device. Later edits need to be saved again.",
      );
    } catch (e) {
      setError(
        (e as Error).message === "This saved plan is not valid."
          ? "Build your days using the current dates before saving."
          : "Could not save your draft. Check your dates and details, or download a copy instead.",
      );
    }
  }
  function restore() {
    clearMessages();
    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) throw new Error("There is no saved draft on this device.");
      const restored = validatePlan(JSON.parse(raw));
      setPlan(restored);
      setSource("");
      setMessage("Your saved draft is restored.");
    } catch (e) {
      setError(
        e instanceof SyntaxError
          ? "The saved draft could not be read. Downloaded plans can be imported below."
          : (e as Error).message,
      );
    }
  }
  function download() {
    clearMessages();
    try {
      const value = validCurrent();
      const url = URL.createObjectURL(
        new Blob([JSON.stringify(value, null, 2)], {
          type: "application/json",
        }),
      );
      const a = document.createElement("a");
      a.href = url;
      a.download = "amaravati-itinerary.json";
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      setMessage(
        "Your itinerary copy is ready. Use Import a plan to open it again.",
      );
    } catch {
      setError("Build your days using the current dates before downloading.");
    }
  }
  async function importPlan(e: React.ChangeEvent<HTMLInputElement>) {
    clearMessages();
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      if (file.size > 250000)
        throw new Error("Please choose a plan smaller than 250 KB.");
      const restored = validatePlan(JSON.parse(await file.text()));
      setPlan(restored);
      setSource("");
      setMessage(
        "Your itinerary is imported. Save it to keep a draft on this device.",
      );
    } catch (e) {
      setError(
        e instanceof SyntaxError
          ? "This file is not a valid itinerary JSON file."
          : (e as Error).message,
      );
    } finally {
      e.target.value = "";
    }
  }
  function reset() {
    clearMessages();
    setPlan(blankPlan);
    setSource("");
    setMessage(
      "The current plan is cleared. Your saved draft is still available to restore.",
    );
  }
  return (
    <>
      <div className="planner-steps">
        <span>
          <b>01</b>Set your travel dates
        </span>
        <span>
          <b>02</b>Make each day your own
        </span>
        <span>
          <b>03</b>Save or take a copy
        </span>
      </div>
      <form className="form-panel" onSubmit={generate}>
        <div className="planner-form-header">
          <h2>Your trip details</h2>
          {saved && (
            <button
              type="button"
              className="button button-outline button-small"
              onClick={restore}
            >
              <RotateCcw size={16} />
              Restore saved draft
            </button>
          )}
        </div>
        <div className="field">
          <label htmlFor="plan-name">Trip name *</label>
          <input
            id="plan-name"
            required
            value={plan.name}
            maxLength={100}
            onChange={(e) => {
              clearMessages();
              setPlan({ ...plan, name: e.target.value });
            }}
            placeholder="e.g. Our Kerala escape"
          />
        </div>
        <div className="field-grid">
          <div className="field">
            <label htmlFor="plan-start">Start date *</label>
            <input
              id="plan-start"
              type="date"
              required
              value={plan.start}
              onChange={(e) => {
                clearMessages();
                setPlan({ ...plan, start: e.target.value });
              }}
            />
          </div>
          <div className="field">
            <label htmlFor="plan-end">End date *</label>
            <input
              id="plan-end"
              type="date"
              required
              value={plan.end}
              onChange={(e) => {
                clearMessages();
                setPlan({ ...plan, end: e.target.value });
              }}
            />
          </div>
        </div>
        <div className="field-grid">
          <div className="field">
            <label htmlFor="plan-source">Start with a sample journey</label>
            <select
              id="plan-source"
              value={source}
              onChange={(e) => {
                clearMessages();
                setSource(e.target.value);
              }}
            >
              <option value="">A blank canvas</option>
              {packages.map((p) => (
                <option value={p.slug} key={p.slug}>
                  {p.title} · {p.days} days
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="plan-travellers">Travellers *</label>
            <input
              id="plan-travellers"
              type="number"
              required
              min={1}
              max={30}
              value={plan.travellers || ""}
              onChange={(e) => {
                clearMessages();
                setPlan({ ...plan, travellers: Number(e.target.value) });
              }}
            />
          </div>
        </div>
        <button type="submit" className="button">
          {plan.days.length ? "Update travel days" : "Build my travel days"}{" "}
          <ArrowRight size={17} />
        </button>
        <p className="form-note">
          Plan 1–30 days. Updating dates preserves entries for matching dates. A
          sample fills empty days; your existing entries are kept.
        </p>
      </form>
      {error && (
        <div className="error-message" role="alert">
          {error}
        </div>
      )}
      {message && (
        <div className="status-message" role="status">
          {message}
        </div>
      )}
      {plan.days.length ? (
        <div ref={result} className="planner-result">
          <div className="planner-result-header">
            <div>
              <p className="eyebrow">YOUR DAY-BY-DAY PLAN</p>
              <h2>{plan.name}</h2>
              <p>
                {displayDate(plan.days[0].date)} –{" "}
                {displayDate(plan.days[plan.days.length - 1].date)} ·{" "}
                {plan.days.length} days · {plan.travellers} travellers
              </p>
            </div>
            <button
              className="button button-outline button-small"
              onClick={reset}
              type="button"
            >
              Start a fresh plan
            </button>
          </div>
          {plan.days.map((d, i) => (
            <article key={d.date} className="planner-day">
              <h3 className="planner-day-heading">
                Day {String(i + 1).padStart(2, "0")}
                <time dateTime={d.date}>{displayDate(d.date)}</time>
              </h3>
              <div>
                <div className="field">
                  <label htmlFor={`day-${i}-destination`}>
                    Destination / overnight stay
                  </label>
                  <input
                    id={`day-${i}-destination`}
                    value={d.destination}
                    maxLength={150}
                    placeholder="Where will you be?"
                    onChange={(e) => editDay(i, "destination", e.target.value)}
                  />
                </div>
                <div className="field-grid">
                  <div className="field">
                    <label htmlFor={`day-${i}-activities`}>
                      Activities & experiences
                    </label>
                    <textarea
                      id={`day-${i}-activities`}
                      rows={3}
                      value={d.activities}
                      maxLength={2000}
                      placeholder="A heritage walk, a beach day…"
                      onChange={(e) => editDay(i, "activities", e.target.value)}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor={`day-${i}-notes`}>
                      Notes & little details
                    </label>
                    <textarea
                      id={`day-${i}-notes`}
                      rows={3}
                      value={d.notes}
                      maxLength={2000}
                      placeholder="Transfers, places to eat, reminders…"
                      onChange={(e) => editDay(i, "notes", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </article>
          ))}
          <div className="planner-actions">
            <button type="button" className="button" onClick={save}>
              <Save size={17} />
              Save on this device
            </button>
            <button
              type="button"
              className="button button-outline"
              onClick={download}
            >
              <Download size={17} />
              Download plan
            </button>
            <button
              type="button"
              className="button button-outline"
              onClick={() => window.print()}
            >
              <Printer size={17} />
              Print itinerary
            </button>
          </div>
          <p className="planner-summary">
            Your plans stay in your browser. Saving replaces the previous saved
            draft. Download a copy to keep multiple trips or move a plan to
            another device.
          </p>
        </div>
      ) : (
        <div className="empty-state planner-empty">
          <CalendarDays size={38} />
          <h2>A journey waiting to take shape.</h2>
          <p>
            Give your trip a name and set your dates to create your day-by-day
            plan.
          </p>
        </div>
      )}
      <div className="planner-actions">
        <label className="button button-outline" htmlFor="import-plan">
          <Upload size={17} />
          Import a downloaded plan
          <input
            className="sr-only"
            id="import-plan"
            type="file"
            accept=".json,application/json"
            onChange={importPlan}
          />
        </label>
      </div>
    </>
  );
}
