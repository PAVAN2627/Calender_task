import { useState, useCallback, type CSSProperties } from "react";
import { isBefore, isSameDay, addMonths, subMonths, startOfMonth } from "date-fns";
import CalendarHero from "./CalendarHero";
import CalendarGrid from "./CalendarGrid";
import NotesSection from "./NotesSection";
import SpiralBinding from "./SpiralBinding";

const MONTH_PALETTES: Record<number, { accent: string; accentSoft: string; weekend: string }> = {
  0:  { accent: "199 82% 50%", accentSoft: "199 80% 93%", weekend: "199 74% 48%" },
  1:  { accent: "190 70% 40%", accentSoft: "190 65% 93%", weekend: "185 60% 44%" },
  2:  { accent: "156 62% 36%", accentSoft: "150 52% 92%", weekend: "150 54% 42%" },
  3:  { accent: "30 88% 48%",  accentSoft: "35 95% 93%",  weekend: "24 86% 50%"  },
  4:  { accent: "22 85% 46%",  accentSoft: "24 90% 93%",  weekend: "15 78% 48%"  },
  5:  { accent: "5 78% 50%",   accentSoft: "6 88% 93%",   weekend: "0 72% 54%"   },
  6:  { accent: "345 72% 46%", accentSoft: "344 72% 93%", weekend: "338 64% 50%" },
  7:  { accent: "282 56% 44%", accentSoft: "285 58% 94%", weekend: "276 52% 50%" },
  8:  { accent: "250 58% 48%", accentSoft: "250 62% 94%", weekend: "245 54% 52%" },
  9:  { accent: "220 60% 45%", accentSoft: "220 70% 94%", weekend: "215 55% 50%" },
  10: { accent: "205 72% 44%", accentSoft: "205 78% 94%", weekend: "205 62% 50%" },
  11: { accent: "198 82% 46%", accentSoft: "198 86% 94%", weekend: "198 72% 51%" },
};

const WallCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [rangeStart, setRangeStart] = useState<Date | null>(null);
  const [rangeEnd, setRangeEnd] = useState<Date | null>(null);
  const [previewEnd, setPreviewEnd] = useState<Date | null>(null);
  const [direction, setDirection] = useState(0);

  const handlePrevMonth = useCallback(() => {
    setDirection(-1);
    setCurrentDate((prev) => subMonths(prev, 1));
    setPreviewEnd(null);
  }, []);

  const handleNextMonth = useCallback(() => {
    setDirection(1);
    setCurrentDate((prev) => addMonths(prev, 1));
    setPreviewEnd(null);
  }, []);

  const handleDayClick = useCallback(
    (day: Date) => {
      if (!rangeStart || (rangeStart && rangeEnd)) {
        setRangeStart(day); setRangeEnd(null); setPreviewEnd(null);
      } else {
        if (isSameDay(day, rangeStart)) {
          setRangeStart(null); setRangeEnd(null); setPreviewEnd(null);
        } else if (isBefore(day, rangeStart)) {
          setRangeEnd(rangeStart); setRangeStart(day); setPreviewEnd(null);
        } else {
          setRangeEnd(day); setPreviewEnd(null);
        }
      }
    },
    [rangeStart, rangeEnd]
  );

  const handleDayHover = useCallback(
    (day: Date | null) => { if (rangeStart && !rangeEnd) setPreviewEnd(day); },
    [rangeStart, rangeEnd]
  );

  const jumpToToday = useCallback(() => {
    const today = new Date();
    setCurrentDate(startOfMonth(today));
    setDirection(0);
    setRangeStart(today);
    setRangeEnd(null);
    setPreviewEnd(null);
  }, []);

  const clearRange = useCallback(() => {
    setRangeStart(null);
    setRangeEnd(null);
    setPreviewEnd(null);
  }, []);

  const p = MONTH_PALETTES[currentDate.getMonth()];
  const theme = {
    "--calendar-accent": p.accent,
    "--calendar-selected-start": p.accent,
    "--calendar-selected-end": p.weekend,
    "--calendar-selected-range": p.accentSoft,
    "--calendar-weekend": p.weekend,
  } as CSSProperties;

  return (
    <div style={{ background: "#e0e0e0", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
      <section
        style={{
          ...theme,
          width: "380px",
          background: "white",
          borderRadius: "4px",
          overflow: "hidden",
          boxShadow: "0 30px 80px rgba(0,0,0,0.25), 0 8px 20px rgba(0,0,0,0.12)",
        }}
      >
        {/* Spiral binding */}
        <SpiralBinding />

        {/* Hero: photo + blue shapes */}
        <CalendarHero
          currentDate={currentDate}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
          direction={direction}
        />

        {/* Toolbar */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "6px 14px",
          borderBottom: "1px solid #f0f0f0",
          background: "white",
        }}>
          <span style={{ fontSize: "11px", color: "#aaa", letterSpacing: "0.05em" }}>
            {rangeStart && rangeEnd
              ? `${rangeStart.toLocaleDateString()} – ${rangeEnd.toLocaleDateString()}`
              : rangeStart
              ? "Select end date"
              : "Select a date"}
          </span>
          <div style={{ display: "flex", gap: "6px" }}>
            <button
              onClick={jumpToToday}
              style={{
                fontSize: "11px",
                padding: "3px 10px",
                borderRadius: "20px",
                border: `1px solid hsl(var(--calendar-accent))`,
                background: "transparent",
                color: `hsl(var(--calendar-accent))`,
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Today
            </button>
            <button
              onClick={clearRange}
              style={{
                fontSize: "11px",
                padding: "3px 10px",
                borderRadius: "20px",
                border: "1px solid #ddd",
                background: "transparent",
                color: "#888",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Clear
            </button>
          </div>
        </div>

        {/* Bottom white section: Notes | Grid */}
        <div style={{ display: "flex", background: "white", padding: "16px 0 16px 0" }}>
          {/* Notes — left ~35% */}
          <div style={{ width: "35%", paddingLeft: "16px", paddingRight: "8px" }}>
            <NotesSection
              currentDate={currentDate}
              rangeStart={rangeStart}
              rangeEnd={rangeEnd}
            />
          </div>

          {/* Grid — right ~65% */}
          <div style={{ width: "65%" }}>
            <CalendarGrid
              currentDate={currentDate}
              rangeStart={rangeStart}
              rangeEnd={rangeEnd}
              previewEnd={previewEnd}
              onDayClick={handleDayClick}
              onDayHover={handleDayHover}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default WallCalendar;
