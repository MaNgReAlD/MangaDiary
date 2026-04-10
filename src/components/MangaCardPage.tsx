import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { dbRealtime } from "../firebase";
import { ref, get } from "firebase/database";
import MangaCard from "./MangaCard";
import type { Manga } from "../types";

export default function MangaCardPage() {
  const { id } = useParams<{ id: string }>();
  const [manga, setManga] = useState<Manga | null>(null);

  useEffect(() => {
    if (!id) return;
    const mangaRef = ref(dbRealtime, `mangas/${id}`);
    get(mangaRef).then(snapshot => {
      if (snapshot.exists()) {
        setManga({ id, ...(snapshot.val() as Omit<Manga, "id">) });
      }
    });
  }, [id]);

  if (!manga) return <p>Манга не найдена</p>;

  return (
    <MangaCard
      manga={manga}
      onDelete={() => {}}
      onUpdate={() => {}}
    />
  );
}
