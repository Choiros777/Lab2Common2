import { useEffect, useMemo, useState } from "react";

import {
  createNote,
  deleteNote,
  getNotes,
  updateNote,
} from "./api/client";

import { NoteEditor } from "./components/NoteEditor";
import { NotesList } from "./components/NotesList";
import { Sidebar } from "./components/Sidebar";
import { AppLayout } from "./layouts/AppLayout";
import type { Note } from "./types/note";

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    void loadNotes();
  }, []);

  async function loadNotes() {
    try {
      const loadedNotes = await getNotes();

      setNotes(loadedNotes);

      if (loadedNotes.length > 0) {
        setSelectedId(loadedNotes[0].id);
      }
    } catch (error) {
      setError(String(error));
    }
  }

  const filteredNotes = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return notes;
    }

    return notes.filter((note) =>
      `${note.title} ${note.content}`
        .toLowerCase()
        .includes(query),
    );
  }, [notes, search]);

  const selectedNote =
    notes.find((note) => note.id === selectedId) || null;

  async function handleCreate() {
    try {
      const note = await createNote(
        "Новая заметка",
        "",
      );

      setNotes((current) => [note, ...current]);
      setSelectedId(note.id);
    } catch (error) {
      setError(String(error));
    }
  }

  async function handleSave(
    id: number,
    data: {
      title: string;
      content: string;
      is_favorite: boolean;
    },
  ) {
    const updatedNote = await updateNote(id, data);

    setNotes((current) =>
      current.map((note) =>
        note.id === updatedNote.id ? updatedNote : note,
      ),
    );
  }

  async function handleDelete(id: number) {
    await deleteNote(id);

    setNotes((current) =>
      current.filter((note) => note.id !== id),
    );

    setSelectedId(null);
  }

  return (
    <>
      {error && <div className="error-banner">{error}</div>}

      <div onClick={(event) => {
        const target = event.target as HTMLElement;

        if (target.closest(".new-note-button")) {
          void handleCreate();
        }
      }}>
        <AppLayout
          sidebar={
            <Sidebar
              search={search}
              onSearchChange={setSearch}
              totalNotes={notes.length}
              favoriteNotes={
                notes.filter((note) => note.is_favorite).length
              }
            />
          }
          list={
            <NotesList
              notes={filteredNotes}
              selectedId={selectedId}
              onSelect={(note) => setSelectedId(note.id)}
            />
          }
          editor={
            <NoteEditor
              note={selectedNote}
              onSave={handleSave}
              onDelete={handleDelete}
            />
          }
        />
      </div>
    </>
  );
}

export default App;