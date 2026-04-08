import { useState, useEffect } from "react";
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

  useEffect(() => {
    setNotes(loadNotes(monthKey));
  }, [monthKey]);

  const addNote = () => {
    if (!draft.trim()) { setEditing(false); return; }
    const scope: NoteEntry["scope"] = rangeStart && rangeEnd ? "range" : rangeStart ? "day" : "month";
    const note: NoteEntry = {
      id: Date.now().toString(),
      text: draft.trim(),
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
                onClick={() => removeNote(note.id)}
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

      {/* Add note */}
      {editing ? (
        <div className="mt-2 flex gap-1">
          <input
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addNote();
              if (e.key === "Escape") setEditing(false);
            }}
            placeholder="Note…"
            className="flex-1 text-[10px] border-b border-gray-300 outline-none bg-transparent py-0.5"
          />
          <button
            onClick={addNote}
            className="text-[9px] px-1.5 py-0.5 rounded bg-gray-800 text-white font-semibold"
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
