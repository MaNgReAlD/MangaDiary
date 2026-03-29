import { useState } from "react";
import type { Manga } from "../types";

interface Props {
  manga: Manga;
  onDelete: () => void;
  onUpdate: (manga: Manga) => void;
}

export default function MangaCard({ manga, onDelete, onUpdate }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(manga.title);
  const [author, setAuthor] = useState(manga.author);
  const [finishedAt, setFinishedAt] = useState(manga.finishedAt);
  const [rating, setRating] = useState(manga.rating);
  const [note, setNote] = useState(manga.note || "");
  const [imageUrl, setImageUrl] = useState(manga.imageUrl || "");

  const handleSave = () => {
    onUpdate({
      ...manga,
      title: title.trim(),
      author: author.trim(),
      finishedAt,
      rating,
      note: note.trim(),
      imageUrl: imageUrl.trim()
    });
    setIsEditing(false);
  };

  return (
    <div className="manga-card">
      {isEditing ? (
        <>
          <input value={title} onChange={e => setTitle(e.target.value)} />
          <input value={author} onChange={e => setAuthor(e.target.value)} />
          <input type="date" value={finishedAt} onChange={e => setFinishedAt(e.target.value)} />
          <select value={rating} onChange={e => setRating(Number(e.target.value))}>
            {[1,2,3,4,5].map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          <textarea value={note} onChange={e => setNote(e.target.value)} />
          <input
            type="text"
            placeholder="Ссылка на изображение"
            value={imageUrl}
            onChange={e => setImageUrl(e.target.value)}
          />
          <button onClick={handleSave}>Сохранить</button>
          <button onClick={() => setIsEditing(false)}>Отмена</button>
        </>
      ) : (
        <div className="card-content">
          <div className="card-text">
            <h3>{manga.title}</h3>
            <p>Мангака: {manga.author}</p>
            <p>Дата окончания: {manga.finishedAt}</p>
            <p>Оценка: {manga.rating}⭐</p>
            <p>{manga.note || "Без заметки"}</p>
            <button onClick={() => setIsEditing(true)}>Редактировать</button>
            <button onClick={onDelete}>Удалить</button>
          </div>
          {manga.imageUrl && (
            <div className="card-image">
              <img src={manga.imageUrl} alt={manga.title} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
