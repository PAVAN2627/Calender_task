# Interactive Wall Calendar (Frontend Engineering Challenge)

A polished React + TypeScript wall-calendar component inspired by a physical hanging calendar layout, with image-first hierarchy, range selection, integrated notes, and responsive behavior.

## Tech Stack

- Vite + React + TypeScript
- Tailwind CSS
- Framer Motion
- date-fns

## Key Features

- Wall calendar aesthetic with:
	- spiral binding
	- large monthly hero image
	- geometric visual divider
	- notes + day grid composition
- Day range selection:
	- click start date, click end date
	- distinct states for start, end, in-range
	- hover preview while selecting an end date
	- quick actions: Today and Clear
- Integrated notes:
	- month memo support
	- day-specific note support (single selected day)
	- date-range note support (selected range)
	- localStorage persistence per month
- Responsive design:
	- desktop split layout (notes and grid)
	- mobile stacked layout with touch-friendly date cells
- Extra polish:
	- month-based dynamic accent theming
	- animated image transitions and staggered day reveal
	- holiday marker dots

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install

```bash
npm install
```

### Run locally

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Run tests

```bash
npm run test
```

## Project Structure

- Main page: src/pages/Index.tsx
- Calendar shell: src/components/calendar/WallCalendar.tsx
- Hero image panel: src/components/calendar/CalendarHero.tsx
- Day grid: src/components/calendar/CalendarGrid.tsx
- Notes panel: src/components/calendar/NotesSection.tsx
- Date + storage utilities: src/lib/calendarUtils.ts

## Submission Checklist

1. Source Code Repository (Required)
	 - Public GitHub/GitLab URL: ADD_LINK_HERE
2. Video Demonstration (Required)
	 - Demo Video: https://youtu.be/_2BpGD-wWEo?si=kaSw2EghB09Dlbn9
3. Live Demo
	 - Live Link: https://calender-task-ecru.vercel.app/

## Notes on Scope

- This implementation is frontend-only.
- No backend/API/database is required.
- All persistence is done with browser localStorage.
