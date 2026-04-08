import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MONTH_IMAGES, format } from "@/lib/calendarUtils";

interface CalendarHeroProps {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  direction: number;
}

const CalendarHero = ({ currentDate, onPrevMonth, onNextMonth, direction }: CalendarHeroProps) => {
  const monthIndex = currentDate.getMonth();
  const imageSrc = MONTH_IMAGES[monthIndex];
  const monthName = format(currentDate, "MMMM").toUpperCase();
  const year = format(currentDate, "yyyy");

  return (
    <div className="relative w-full overflow-hidden bg-white" style={{ height: "300px" }}>

      {/* Left side: photo, clipped to ~42% width */}
      <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: "42%" }}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.img
            key={`${year}-${monthIndex}`}
            src={imageSrc}
            alt={`${monthName} ${year}`}
            className="w-full h-full object-cover"
            custom={direction}
            initial={{ opacity: 0, x: direction * 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -30 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          />
        </AnimatePresence>

        {/* Bottom-left triangle in accent color */}
        <svg
          className="absolute bottom-0 left-0 w-full pointer-events-none"
          viewBox="0 0 210 60"
          preserveAspectRatio="none"
          style={{ height: "60px" }}
        >
          <path d="M0,60 L0,20 L130,60 Z" fill="hsl(var(--calendar-accent))" />
        </svg>
      </div>

      {/* Right side: solid accent color block */}
      <div
        className="absolute inset-y-0 right-0 flex flex-col items-center justify-center"
        style={{
          width: "58%",
          background: "hsl(var(--calendar-accent))",
        }}
      >
        {/* Year + Month */}
        <p className="text-base font-light tracking-[0.3em] text-white/85 leading-none mb-2">
          {year}
        </p>
        <h2 className="text-5xl font-black tracking-wide text-white leading-none">
          {monthName}
        </h2>

        {/* Wavy bottom edge — white waves cut up from below */}
        <svg
          className="absolute bottom-0 left-0 w-full pointer-events-none"
          viewBox="0 0 290 55"
          preserveAspectRatio="none"
          style={{ height: "55px" }}
        >
          <path
            d="M0,55 L0,35 C30,10 60,50 90,30 C120,10 150,45 180,28 C210,10 240,48 290,25 L290,55 Z"
            fill="white"
          />
        </svg>
      </div>

      {/* Nav arrows */}
      <button
        onClick={onPrevMonth}
        className="absolute z-20 flex items-center justify-center rounded-full text-white transition-colors"
        style={{
          left: "8px",
          top: "50%",
          transform: "translateY(-50%)",
          width: "32px",
          height: "32px",
          background: "hsl(var(--calendar-accent) / 0.75)",
        }}
        aria-label="Previous month"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button
        onClick={onNextMonth}
        className="absolute z-20 flex items-center justify-center rounded-full text-white transition-colors"
        style={{
          right: "8px",
          top: "50%",
          transform: "translateY(-50%)",
          width: "32px",
          height: "32px",
          background: "hsl(var(--calendar-accent) / 0.75)",
        }}
        aria-label="Next month"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default CalendarHero;
