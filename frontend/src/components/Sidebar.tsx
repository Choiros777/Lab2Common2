type SidebarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  totalNotes: number;
  favoriteNotes: number;
};

export function Sidebar({
  search,
  onSearchChange,
  totalNotes,
  favoriteNotes,
}: SidebarProps) {
  return (
    <div className="sidebar-content">
      <label className="search-box">
        <span>⌕</span>

        <input
          value={search}
          onChange={(event) =>
            onSearchChange(event.target.value)
          }
          placeholder="Поиск заметок"
        />
      </label>

      <nav className="sidebar-nav">
        <button className="nav-item nav-item-active">
          <span>▤</span>
          <span>Все заметки</span>
          <span className="nav-count">{totalNotes}</span>
        </button>

        <button className="nav-item">
          <span>☆</span>
          <span>Избранное</span>
          <span className="nav-count">{favoriteNotes}</span>
        </button>
      </nav>

      <div className="sidebar-section">
        <div className="sidebar-section-title">
          Мои коллекции
        </div>

        <button className="collection-item">
          <span className="collection-dot collection-dot-blue" />
          Личные
        </button>

        <button className="collection-item">
          <span className="collection-dot collection-dot-yellow" />
          Работа
        </button>

        <button className="collection-item">
          <span className="collection-dot collection-dot-green" />
          Идеи
        </button>
      </div>
    </div>
  );
}