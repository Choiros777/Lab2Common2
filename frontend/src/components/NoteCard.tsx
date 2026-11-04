import type { Note } from "../types/note";

type NoteCardProps = {
  note: Note;
  selected: boolean;
  onClick: () => void;
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "short",
  }).format(new Date(value));
}

export function NoteCard({
  note,
  selected,
  onClick,
}: NoteCardProps) {
  return (
    <button
      className={`note-card ${
        selected ? "note-card-selected" : ""
      }`}
      onClick={onClick}
    >
      <div className="note-card-header">
        <h2>{note.title || "Без названия"}</h2>

        {note.is_favorite && (
          <span className="favorite-mark">★</span>
        )}
      </div>

      <p className="note-card-preview">
        {note.content || "Нет содержимого"}
      </p>

      <time className="note-card-date">
        {formatDate(note.updated_at)}
      </time>
    </button>
  );
}