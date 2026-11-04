import type { Note } from "../types/note";
import { NoteCard } from "./NoteCard";

type NotesListProps = {
  notes: Note[];
  selectedId: number | null;
  onSelect: (note: Note) => void;
};

export function NotesList({
  notes,
  selectedId,
  onSelect,
}: NotesListProps) {
  return (
    <section className="notes-list">
      <div className="section-heading">
        <div>
          <p className="eyebrow">ЗАПИСКИ</p>
          <h1>Все заметки</h1>
        </div>

        <button className="icon-button">⋮</button>
      </div>

      <div className="notes-list-items">
        {notes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            selected={note.id === selectedId}
            onClick={() => onSelect(note)}
          />
        ))}
      </div>
    </section>
  );
}