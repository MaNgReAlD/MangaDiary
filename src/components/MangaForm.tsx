import { useState } from "react";
import type { Manga } from "../types";

interface Props {
  onSubmit: (manga: Manga) => void;
  onCancel?: () => void;
  initialData?: Manga;
}

export default function MangaForm({ onSubmit, onCancel, initialData }: Props) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [author, setAuthor] = useState(initialData?.author || "");
  const [rating, setRating] = useState(initialData?.rating || 0);
  const [note, setNote] = useState(initialData?.note || "");
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || "");
  const [finishedAt, setFinishedAt] = useState(initialData?.finishedAt || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const manga: Manga = {
      id: initialData?.id || crypto.randomUUID(),
      title,
      author,
      rating,
      note,
      imageUrl,
      finishedAt
    };
    onSubmit(manga);
  };

  return (
    <form className="manga-form" onSubmit={handleSubmit}>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Название манги" required />
      <input value={author} onChange={e => setAuthor(e.target.value)} placeholder="Автор" required />
      <input type="number" value={rating} onChange={e => setRating(Number(e.target.value))} placeholder="Оценка" min="0" max="10" />
      <textarea value={note} onChange={e => setNote(e.target.value)} placeholder="Заметки" />
      <input value={imageUrl} onChange={e => setImageUrl(e.target.value)} placeholder="Ссылка на картинку" />
      <input type="date" value={finishedAt} onChange={e => setFinishedAt(e.target.value)} />

      <button type="submit">{initialData ? "Сохранить" : "Добавить"}</button>
      {onCancel && <button type="button" onClick={onCancel}>Отмена</button>}
    </form>
  );
}
