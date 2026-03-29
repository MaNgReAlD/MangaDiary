import { useState } from "react";
import type { Manga } from "../types";
import { v4 as uuidv4 } from "uuid";

interface Props {
  onSubmit: (manga: Manga) => void;
}

export default function MangaForm({ onSubmit }: Props) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [finishedAt, setFinishedAt] = useState("");
  const [rating, setRating] = useState(3);
  const [note, setNote] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !author.trim() || !finishedAt) {
      setError("Все обязательные поля должны быть заполнены");
      return;
    }

    const manga: Manga = {
      id: uuidv4(),
      title: title.trim(),
      author: author.trim(),
      finishedAt,
      rating,
      note: note.trim(),
      imageUrl: imageUrl.trim()
    };

    onSubmit(manga);
    setTitle(""); setAuthor(""); setFinishedAt("");
    setRating(3); setNote(""); setImageUrl(""); setError("");
  };

  return (
    <form onSubmit={handleSubmit} className="manga-form">
      <input
        type="text"
        placeholder="Название манги"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Мангака"
        value={author}
        onChange={e => setAuthor(e.target.value)}
      />
      <input
        type="date"
        value={finishedAt}
        onChange={e => setFinishedAt(e.target.value)}
      />
      <select value={rating} onChange={e => setRating(Number(e.target.value))}>
        {[1,2,3,4,5].map(r => <option key={r} value={r}>{r}</option>)}
      </select>
      <textarea
        placeholder="Заметка"
        value={note}
        onChange={e => setNote(e.target.value)}
      />
      <input
        type="text"
        placeholder="Ссылка на изображение"
        value={imageUrl}
        onChange={e => setImageUrl(e.target.value)}
      />
      {error && <p className="error">{error}</p>}
      <button type="submit">Добавить</button>
    </form>
  );
}
