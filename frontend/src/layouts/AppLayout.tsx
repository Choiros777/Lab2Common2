import type { ReactNode } from "react";
import { PhotoStack } from "../components/PhotoStack";

type AppLayoutProps = {
  sidebar: ReactNode;
  list: ReactNode;
  editor: ReactNode;
  onCreateNote: () => void;
};

export function AppLayout({
  sidebar,
  list,
  editor,
  onCreateNote,
}: AppLayoutProps) {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <PhotoStack alt="Фотографии ИТМО" />
          <span className="brand-title">
            Наши заметки
          </span>
        </div>

        <button
          className="new-note-button"
          onClick={onCreateNote}
        >
          <span>+</span>
          <span>Новая заметка</span>
        </button>
      </header>

      <div className="workspace">
        <aside className="sidebar">{sidebar}</aside>

        <section className="notes-column">{list}</section>

        <main className="editor-column">{editor}</main>
      </div>
    </div>
  );
}