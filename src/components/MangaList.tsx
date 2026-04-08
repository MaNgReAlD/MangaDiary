import { useState } from "react";
import type { Manga } from "../types";
import CommentList from "./CommentList";

interface Props {
  mangaList: Manga[];
  onDelete: (id: string) => void;
  onUpdate: (manga: Manga) => void;
}

export default function MangaList({ mangaList, onDelete, onUpdate }: Props) {
  const [openComments, setOpenComments] = useState<string | null>(null);

  return (
    <div className="manga-list">
      {mangaList.map(manga => (
        <div key={manga.id} className="manga-card">
          <div className="card-content">
            <div className="card-text">
              <h2>{manga.title}</h2>
              <p><b>Мангака:</b> {manga.author}</p>
              {manga.finishedAt && <p><b>Дата окончания:</b> {manga.finishedAt}</p>}
              <p><b>Оценка:</b> {manga.rating}⭐</p>
              {manga.note && <p>{manga.note}</p>}
            </div>
            {manga.imageUrl && (
              <div className="card-image">
                <img src={manga.imageUrl} alt={manga.title} />
              </div>
            )}
          </div>

          <div className="card-actions">
            <button onClick={() => onUpdate(manga)}>Редактировать</button>
            <button onClick={() => onDelete(manga.id)}>Удалить</button>
            <button
              className="comment"
              onClick={() => setOpenComments(openComments === manga.id ? null : manga.id)}
            >
              {openComments === manga.id ? "Скрыть комментарии" : "Комментарии"}
            </button>
          </div>

          {openComments === manga.id && <CommentList mangaId={manga.id} />}
        </div>
      ))}
    </div>
  );
}
