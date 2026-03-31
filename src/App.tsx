import { useState, useEffect } from "react";
import type { Manga } from "./types";
import MangaForm from "./components/MangaForm";
import MangaList from "./components/MangaList";
import "./App.css";

function App() {
  const [mangaList, setMangaList] = useState<Manga[]>(() => {
    const saved = localStorage.getItem("mangaList");
    return saved ? JSON.parse(saved) : [];
  });

  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("mangaList", JSON.stringify(mangaList));
  }, [mangaList]);

  const handleAddManga = (manga: Manga) => {
    setMangaList(prev => [manga, ...prev]);
  };

  const handleUpdateManga = (updated: Manga) => {
    setMangaList(prev => prev.map(m => (m.id === updated.id ? updated : m)));
  };

  const handleDeleteManga = (id: string) => {
    setMangaList(prev => prev.filter(m => m.id !== id));
  };

  const filteredList = mangaList.filter(m => {
    const matchesRating = filterRating ? m.rating === filterRating : true;
    const matchesSearch = m.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRating && matchesSearch;
  });

  return (
    <div className="app">
      <h1>Манга‑дневник</h1>

      <div className="controls">
        <input
          type="text"
          placeholder="Поиск по названию"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />

        <select
          value={filterRating ?? ""}
          onChange={e => {
            const val = e.target.value;
            setFilterRating(val ? Number(val) : null);
          }}
        >
          <option value="">Все оценки</option>
          {[1, 2, 3, 4, 5].map(r => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>

        <button onClick={() => setIsModalOpen(true)}>Добавить мангу</button>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <MangaForm
              onSubmit={(manga) => {
                handleAddManga(manga);
                setIsModalOpen(false);
              }}
            />
            <button onClick={() => setIsModalOpen(false)}>Закрыть</button>
          </div>
        </div>
      )}

      <MangaList
        mangaList={filteredList}
        onDelete={handleDeleteManga}
        onUpdate={handleUpdateManga}
      />
    </div>
  );
}

export default App;
