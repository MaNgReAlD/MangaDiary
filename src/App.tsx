import { useState, useEffect } from "react";
import type { Manga } from "./types";
import MangaForm from "./components/MangaForm";
import MangaList from "./components/MangaList";
import { getMangaList, addManga, deleteManga } from "./services/mangaService";
import "./App.css";

function App() {
  const [mangaList, setMangaList] = useState<Manga[]>([]);
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const data = await getMangaList();
      console.log("Данные из Firestore:", data);
      setMangaList(data);
    }
    fetchData();
  }, []);

  const handleAddManga = async (manga: Manga) => {
    await addManga({
      title: manga.title,
      author: manga.author,
      rating: Number(manga.rating),
      note: manga.note,
      imageUrl: manga.imageUrl,
      finishedAt: manga.finishedAt
    });
    const data = await getMangaList();
    setMangaList(data);
    setIsModalOpen(false);
  };

  const handleUpdateManga = (updated: Manga) => {
    setMangaList(prev => prev.map(m => (m.id === updated.id ? updated : m)));
  };

  const handleDeleteManga = async (id: string) => {
    await deleteManga(id);
    setMangaList(prev => prev.filter(m => m.id !== id));
  };

  const filteredList = mangaList.filter(m => {
    const matchesRating = filterRating ? m.rating === filterRating : true;
    const matchesSearch = m.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRating && matchesSearch;
  });

  return (
    <div className="app">
      <h1>Манга‑дневник (Firebase)</h1>

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
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(r => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>

        <button onClick={() => setIsModalOpen(true)}>Добавить мангу</button>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <MangaForm onSubmit={handleAddManga} />
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
