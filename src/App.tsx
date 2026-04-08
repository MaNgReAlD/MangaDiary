import { useEffect, useState } from "react";
import { getMangaList, addManga, deleteManga, updateManga } from "./services/mangaService";
import MangaList from "./components/MangaList";
import MangaForm from "./components/MangaForm";
import type { Manga } from "./types";
import "./App.css";

export default function App() {
  const [mangaList, setMangaList] = useState<Manga[]>([]);
  const [editingManga, setEditingManga] = useState<Manga | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const list = await getMangaList();
      setMangaList(list);
    }
    fetchData();
  }, []);

  const handleAdd = async (manga: Manga) => {
    await addManga(manga);
    const list = await getMangaList();
    setMangaList(list);
    setShowForm(false);
  };

  const handleDelete = async (id: string) => {
    await deleteManga(id);
    const list = await getMangaList();
    setMangaList(list);
  };

  const handleUpdate = (manga: Manga) => {
    setEditingManga(manga);
  };

  const filteredList = mangaList.filter(m =>
    m.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (ratingFilter ? m.rating === ratingFilter : true)
  );

  return (
    <div className="app">
      <h1>Манга-дневник (Firebase)</h1>

      {/* Панель управления */}
      <div className="controls">
        <input
          type="text"
          placeholder="Поиск по названию"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <select
          value={ratingFilter ?? ""}
          onChange={e => setRatingFilter(e.target.value ? Number(e.target.value) : null)}
        >
          <option value="">Все оценки</option>
          {[...Array(11).keys()].map(r => (
            <option key={r} value={r}>{r}⭐</option>
          ))}
        </select>
        <button onClick={() => setShowForm(true)}>Добавить мангу</button>
      </div>

      {/* Список манги */}
      <MangaList
        mangaList={filteredList}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
      />

      {/* Модальное окно добавления */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Добавить мангу</h2>
            <MangaForm
              onSubmit={handleAdd}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}

      {/* Модальное окно редактирования */}
      {editingManga && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Редактировать мангу</h2>
            <MangaForm
              initialData={editingManga}
              onSubmit={async (updated) => {
                await updateManga(updated);
                const list = await getMangaList();
                setMangaList(list);
                setEditingManga(null);
              }}
              onCancel={() => setEditingManga(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
