# FitLog — Workout Library

A dark-themed gym companion app built for the B14-A6 assignment. Pick a lift from
the library, read the instructions, and lock it into today's plan (or save it for
later). Everything's built with the Figma/Penpot design as the reference and the
FitLog API for the actual workout data.

Live: _add your deployed link here_
Repo: _add your github link here_

## Stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- Tailwind CSS v4
- lucide-react for icons
- Context API + localStorage for state (no external state library, didn't need one)
- Data from `https://api.abcz.workers.dev/api/fitlog`

## Features

- **Library grid** — all 12 workouts pulled from the API, 3 columns on desktop
  down to 1 on mobile, with a sort dropdown (Duration / Calories / Rating) and a
  loading spinner while the fetch is in flight.
- **Exercise detail pages** (`/exercise/[id]`) — full specs table, step-by-step
  instructions, and the two action buttons (Add to today's plan / Save for later).
- **Today's Plan + Saved, persisted** — plan/saved items are stored as IDs in
  localStorage and joined against the live API data, so a refresh doesn't lose
  anything and the data never goes stale. Plan is capped at 5 for the day.
- **My Plan dashboard** — live exercise/minute/calorie totals, tabs for
  Today's Plan vs Saved, mark-as-done and remove actions, empty states.
- **Toasts everywhere** — every add/remove/mark-done action gets a small
  confirmation toast instead of silently updating.
- **404 + navbar badges** — unknown routes get a proper 404 page, and the
  navbar's Plan/Saved counters update live from whatever's actually stored.

## Running it

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

For a production build:

```bash
npm run build
npm run start
```

## Notes

- Colors/fonts (Oswald for headings, Inter for body, `#ccff00` accent on a
  `#0f1115` background) come straight from the Penpot file in `/UI`.
- Workout images and the "Add to plan" flow both depend on the FitLog API being
  up — if it's down the library shows an error state instead of a blank page.
