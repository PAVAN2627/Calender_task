import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { NoteEntry, loadNotes, saveNotes, format } from "@/lib/calendarUtils";

interface NotesSectionProps {
  currentDate: Date;
  rangeStart: Date | null;
  rangeEnd: Date | null;
}

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
    if (!text) { setEditing(false); return; }
    const scope: NoteEntry["scope"] =
      rangeStart && rangeEnd ? "range" : rangeStart ? "day" : "month";
    const note: NoteEntry = {
      id: Date.now().toString(),
      text,
      date: monthKey,
      scope,
      day: scope === "day" && rangeStart ? rangeStart.toISOString() : undefined,
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

  const getLabel = (note: NoteEntry): string => {
    if (note.scope === "range" && note.rangeStart && note.rangeEnd)
      return `${format(new Date(note.rangeStart), "MMM d")} – ${format(new Date(note.rangeEnd), "MMM d")}`;
    if (note.scope === "day" && note.day)
      return format(new Date(note.day), "MMM d");
    return format(currentDate, "MMMM");
  };

  const currentLabel =
    rangeStart && rangeEnd
      ? `${format(rangeStart, "MMM d")} – ${format(rangeEnd, "MMM d")}`
      : rangeStart
      ? format(rangeStart, "MMM d")
      : "month";

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>
      <p className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase mb-2" style={{ flexShrink: 0 }}>
        Notes
      </p>

      {/* Scrollable notes list */}
      <div style={{ flex: 1, overflowY: "auto", minHeight: 0 }}>
        <AnimatePresence initial={false}>
          {notes.map((note) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="group border-b border-gray-200"
              style={{ paddingTop: "5px", paddingBottom: "5px" }}
            >
              <div className="flex items-start gap-1">
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] text-gray-800 leading-tight break-words">{note.text}</p>
                  <span className="text-[9px] font-semibold tracking-wide" style={{ color: "hsl(var(--calendar-accent))" }}>
                    {getLabel(note)}
                  </span>
                </div>
                <button
                  onMouseDown={(e) => { e.preventDefault(); removeNote(note.id); }}
                  className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-400 transition-all mt-0.5 shrink-0"
                >
                  <X className="w-2.5 h-2.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Add note — pinned at bottom */}
      <div style={{ flexShrink: 0, paddingTop: "6px" }}>
        {editing ? (
          <div className="flex gap-1 items-center">
            <input
              ref={inputRef}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") addNote();
                if (e.key === "Escape") { setEditing(false); setDraft(""); }
              }}
              placeholder={`Note for ${currentLabel}…`}
              className="flex-1 text-[10px] border-b border-gray-400 outline-none bg-transparent py-0.5 min-w-0"
            />
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
            className="text-[10px] text-gray-400 hover:text-gray-600 transition-colors text-left"
          >
            + add note
          </button>
        )}
      </div>
    </div>
  );
};

export default NotesSection;
