import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { NoteEntry, loadNotes, saveNotes, format } from "@/lib/calendarUtils";

interface NotesSectionProps {
  currentDate: Date;
  rangeStart: Date | null;
  rangeEnd: Date | null;
}

const TOTAL_LINES = 7;

const NotesSection = ({ currentDate, rangeStart, rangeEnd }: NotesSectionProps) => {
  const monthKey = format(currentDate, "yyyy-MM");
  const [notes, setNotes] = useState<NoteEntry[]>([]);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setNotes(loadNotes(monthKey));
    setEditing(false);
    setDraft("");
  }, [monthKey]);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  const addNote = () => {
    const text = draft.trim();
    if (!text) {
      setEditing(false);
      return;
    }
    const scope: NoteEntry["scope"] =
      rangeStart && rangeEnd ? "range" : rangeStart ? "day" : "month";
    const note: NoteEntry = {
      id: Date.now().toString(),
      text,
      date: monthKey,
      scope,
      rangeStart: rangeStart?.toISOString(),
      rangeEnd: rangeEnd?.toISOString(),
    };
    const updated = [...notes, note];
    setNotes(updated);
    saveNotes(monthKey, updated);
    setDraft("");
    setEditing(false);
  };

  const removeNote = (id: string) => {
    const updated = notes.filter((n) => n.id !== id);
    setNotes(updated);
    saveNotes(monthKey, updated);
  };

  const blankCount = Math.max(0, TOTAL_LINES - notes.length);

  return (
    <div className="flex flex-col h-full">
      <p className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase mb-3">
        Notes
      </p>

      {/* Note lines */}
      <div className="flex-1">
        <AnimatePresence>
          {notes.map((note) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="group flex items-center gap-1 border-b border-gray-200 py-[7px]"
            >
              <span className="flex-1 text-[10px] text-gray-700 truncate leading-none">
                {note.text}
              </span>
              <button
                onMouseDown={(e) => { e.preventDefault(); removeNote(note.id); }}
                className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-400 transition-all"
              >
                <X className="w-2.5 h-2.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Blank ruled lines */}
        {Array.from({ length: blankCount }).map((_, i) => (
          <div
            key={`blank-${i}`}
            className="border-b border-gray-200 py-[7px] cursor-text"
            onClick={() => setEditing(true)}
          />
        ))}
      </div>

      {/* Add note area */}
      {editing ? (
        <div className="mt-2 flex gap-1 items-center">
          <input
            ref={inputRef}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addNote();
              if (e.key === "Escape") { setEditing(false); setDraft(""); }
            }}
            placeholder="Type a note…"
            className="flex-1 text-[11px] border-b border-gray-400 outline-none bg-transparent py-0.5 min-w-0"
          />
          {/* onMouseDown prevents input blur before onClick fires */}
          <button
            onMouseDown={(e) => { e.preventDefault(); addNote(); }}
            style={{
              fontSize: "10px",
              padding: "3px 8px",
              borderRadius: "4px",
              background: "hsl(var(--calendar-accent))",
              color: "white",
              fontWeight: 700,
              border: "none",
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            Add
          </button>
        </div>
      ) : (
        <button
          onClick={() => setEditing(true)}
          className="mt-2 text-[10px] text-gray-400 hover:text-gray-600 transition-colors text-left"
        >
          + add note
        </button>
      )}
    </div>
  );
};

export default NotesSection;
