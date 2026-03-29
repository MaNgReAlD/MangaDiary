import type { Manga } from "../types";
import MangaCard from "./MangaCard";

interface Props {
  mangaList: Manga[];
  onDelete: (id: string) => void;
  onUpdate: (manga: Manga) => void;
}

export default function MangaList({ mangaList, onDelete, onUpdate }: Props) {
  return (
    <div className="manga-list">
      {mangaList.map(manga => (
        <MangaCard
          key={manga.id}
          manga={manga}
          onDelete={() => onDelete(manga.id)}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
}
