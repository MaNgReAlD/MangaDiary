import { useEffect, useState } from "react";
import { dbRealtime } from "../firebase";
import { ref, onValue, remove, update } from "firebase/database";
import MangaCard from "./MangaCard";
import type { Manga } from "../types";
import "../styles/App.css";

interface Props {
  search: string;
  sortBy: "title" | "rating" | "finishedAt";
}

export default function MangaList({ search, sortBy }: Props) {
  const [mangas, setMangas] = useState<Manga[]>([]);

  useEffect(() => {
    const mangasRef = ref(dbRealtime, "mangas");
    const unsubscribe = onValue(mangasRef, snapshot => {
      const data = snapshot.val();
      if (data) {
        const list = Object.entries(data).map(([id, value]) => ({
          id,
          ...(value as Omit<Manga, "id">),
        }));
        setMangas(list);
      } else {
        setMangas([]);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = async (id: string) => {
    const mangaRef = ref(dbRealtime, `mangas/${id}`);
    await remove(mangaRef);
  };

  const handleUpdate = async (manga: Manga) => {
    const mangaRef = ref(dbRealtime, `mangas/${manga.id}`);
    await update(mangaRef, {
      title: manga.title,
      author: manga.author,
      finishedAt: manga.finishedAt,
      rating: manga.rating,
      note: manga.note,
      imageUrl: manga.imageUrl,
    });
  };

  const filtered = mangas
    .filter(m => m.title.toLowerCase().includes(search.toLowerCase()))
  
    .sort((a, b) => {
      if (sortBy === "title") return a.title.localeCompare(b.title);
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "finishedAt") {
        return new Date(b.finishedAt).getTime() - new Date(a.finishedAt).getTime();
      }
      return 0;
    });

  return (
    <div className="manga-list">
      {filtered.map(manga => (
        <MangaCard
          key={manga.id}
          manga={manga}
          onDelete={() => handleDelete(manga.id!)}
          onUpdate={handleUpdate}
        />
      ))}
    </div>
  );
}
