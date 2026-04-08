import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isAfter,
  isBefore,
  format,
  addMonths,
  subMonths,
  isWeekend,
  isToday,
} from "date-fns";

import januaryImg from "@/assets/months/january.jpg";
import februaryImg from "@/assets/months/february.jpg";
import marchImg from "@/assets/months/march.jpg";
import aprilImg from "@/assets/months/april.jpg";
import mayImg from "@/assets/months/may.jpg";
import juneImg from "@/assets/months/june.jpg";
import julyImg from "@/assets/months/july.jpg";
import augustImg from "@/assets/months/august.jpg";
import septemberImg from "@/assets/months/september.jpg";
import octoberImg from "@/assets/months/october.jpg";
import novemberImg from "@/assets/months/november.jpg";
import decemberImg from "@/assets/months/december.jpg";

export const MONTH_IMAGES: Record<number, string> = {
  0: januaryImg,
  1: februaryImg,
  2: marchImg,
  3: aprilImg,
  4: mayImg,
  5: juneImg,
  6: julyImg,
  7: augustImg,
  8: septemberImg,
  9: octoberImg,
  10: novemberImg,
  11: decemberImg,
};

export const WEEKDAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

export const US_HOLIDAYS: Record<string, string> = {
  "01-01": "New Year's Day",
  "01-15": "MLK Jr. Day",
  "02-14": "Valentine's Day",
  "03-17": "St. Patrick's Day",
  "05-26": "Memorial Day",
  "07-04": "Independence Day",
  "09-01": "Labor Day",
  "10-31": "Halloween",
  "11-27": "Thanksgiving",
  "12-25": "Christmas",
  "12-31": "New Year's Eve",
};

export function getCalendarDays(currentDate: Date) {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

  return eachDayOfInterval({ start: calendarStart, end: calendarEnd });
}

export function isInRange(day: Date, start: Date | null, end: Date | null): boolean {
  if (!start || !end) return false;
  const [left, right] = isAfter(start, end) ? [end, start] : [start, end];
  return isAfter(day, left) && isBefore(day, right);
}

export function getHoliday(day: Date): string | undefined {
  const key = format(day, "MM-dd");
  return US_HOLIDAYS[key];
}

export { isSameMonth, isSameDay, isWeekend, isToday, format, addMonths, subMonths };

export type NoteEntry = {
  id: string;
  text: string;
  date: string; // ISO string of the month
  scope?: "month" | "day" | "range";
  day?: string;
  rangeStart?: string;
  rangeEnd?: string;
};

export function loadNotes(monthKey: string): NoteEntry[] {
  try {
    const stored = localStorage.getItem(`calendar-notes-${monthKey}`);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function saveNotes(monthKey: string, notes: NoteEntry[]) {
  localStorage.setItem(`calendar-notes-${monthKey}`, JSON.stringify(notes));
}
