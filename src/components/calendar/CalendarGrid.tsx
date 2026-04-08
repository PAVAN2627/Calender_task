import { motion } from "framer-motion";
import {
  getCalendarDays,
  isSameMonth,
  isSameDay,
  isToday,
  isInRange,
  WEEKDAYS,
  format,
} from "@/lib/calendarUtils";

interface CalendarGridProps {
  currentDate: Date;
  rangeStart: Date | null;
  rangeEnd: Date | null;
  previewEnd: Date | null;
  onDayClick: (day: Date) => void;
  onDayHover: (day: Date | null) => void;
}

const CalendarGrid = ({
  currentDate,
  rangeStart,
  rangeEnd,
  previewEnd,
  onDayClick,
  onDayHover,
}: CalendarGridProps) => {
  const days = getCalendarDays(currentDate);

  const getCellStyle = (day: Date): React.CSSProperties => {
    const isStart = !!(rangeStart && isSameDay(day, rangeStart));
    const isEnd = !!(rangeEnd && isSameDay(day, rangeEnd));
    if (isStart || isEnd) {
      return {
        background: "hsl(var(--calendar-accent))",
        borderRadius: "50%",
        color: "white",
        fontWeight: 800,
      };
    }
    if (isInRange(day, rangeStart, rangeEnd)) {
      return { background: "hsl(var(--calendar-selected-range))" };
    }
    if (rangeStart && !rangeEnd && previewEnd && isInRange(day, rangeStart, previewEnd)) {
      return { background: "hsl(var(--calendar-selected-range) / 0.4)" };
    }
    return {};
  };

  const getCellColor = (day: Date): string => {
    const inMonth = isSameMonth(day, currentDate);
    if (!inMonth) return "#ccc";

    const isStart = !!(rangeStart && isSameDay(day, rangeStart));
    const isEnd = !!(rangeEnd && isSameDay(day, rangeEnd));
    if (isStart || isEnd) return "white";

    if (isToday(day)) return "hsl(var(--calendar-accent))";

    const dow = day.getDay(); // 0=Sun, 6=Sat
    if (dow === 0 || dow === 6) return "hsl(var(--calendar-weekend))";

    return "#1a1a2e";
  };

  return (
    <div style={{ paddingTop: "12px", paddingBottom: "16px", paddingRight: "16px", paddingLeft: "4px" }}>
      {/* Weekday headers */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", marginBottom: "6px" }}>
        {WEEKDAYS.map((d, i) => (
          <div
            key={d}
            style={{
              textAlign: "center",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              paddingBottom: "8px",
              color: i >= 5 ? "hsl(var(--calendar-weekend))" : "#999",
            }}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <motion.div
        style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        key={format(currentDate, "yyyy-MM")}
      >
        {days.map((day) => (
          <button
            key={day.toISOString()}
            style={{
              height: "42px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "14px",
              fontWeight: 700,
              cursor: "pointer",
              color: getCellColor(day),
              border: "none",
              background: "transparent",
              ...getCellStyle(day),
            }}
            onClick={() => onDayClick(day)}
            onMouseEnter={() => onDayHover(day)}
            onMouseLeave={() => onDayHover(null)}
            aria-label={format(day, "EEEE, MMMM d, yyyy")}
          >
            {format(day, "d")}
          </button>
        ))}
      </motion.div>
    </div>
  );
};

export default CalendarGrid;
