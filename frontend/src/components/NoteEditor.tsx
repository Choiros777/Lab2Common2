import { useEffect, useState } from "react";

import type { Note } from "../types/note";

type NoteEditorProps = {
  note: Note | null;
  onSave: (
    id: number,
    data: {
      title: string;
      content: string;
      is_favorite: boolean;
    },
  ) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
};

export function NoteEditor({
  note,
  onSave,
  onDelete,
}: NoteEditorProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setTitle(note?.title || "");
    setContent(note?.content || "");
    setIsFavorite(note?.is_favorite || false);
  }, [note]);

  if (!note) {
    return (
      <div className="empty-editor">
        <div className="empty-editor-icon">✎</div>
        <h2>Выберите заметку</h2>
        <p>Выберите заметку из списка или создайте новую.</p>
      </div>
    );
  }

  async function handleSave() {
    setSaving(true);

    try {
      await onSave(note.id, {
        title,
        content,
        is_favorite: isFavorite,
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <article className="note-editor">
      <div className="editor-toolbar">
        <div className="editor-meta">
          Изменено сегодня
        </div>

        <div className="editor-actions">
          <button
            className="toolbar-button"
            onClick={() => setIsFavorite(!isFavorite)}
          >
            {isFavorite ? "★" : "☆"}
          </button>

          <button
            className="toolbar-button toolbar-button-danger"
            onClick={() => void onDelete(note.id)}
          >
            Удалить
          </button>

          <button
            className="save-button"
            disabled={saving}
            onClick={() => void handleSave()}
          >
            {saving ? "Сохранение..." : "Сохранить"}
          </button>
        </div>
      </div>

      <input
        className="note-title-input"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Название заметки"
      />

      <textarea
        className="note-content-input"
        value={content}
        onChange={(event) => setContent(event.target.value)}
        placeholder="Начните писать..."
      />
    </article>
  );
}