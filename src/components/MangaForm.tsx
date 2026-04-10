import { useState } from "react";
import { dbRealtime } from "../firebase";
import { ref, push, set } from "firebase/database";
import type { Manga } from "../types";
import { useNavigate } from "react-router-dom";
import "../styles/MangaForm.css";

export default function MangaForm() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [finishedAt, setFinishedAt] = useState("");
  const [rating, setRating] = useState(5);
  const [note, setNote] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !author.trim()) return;

    const newRef = push(ref(dbRealtime, "mangas"));
    const newManga: Omit<Manga, "id"> = {
      title: title.trim(),
      author: author.trim(),
      finishedAt,
      rating,
      note: note.trim(),
      imageUrl: imageUrl.trim(),
    };

    await set(newRef, newManga);

    // ✅ теперь перекидывает на главную
    navigate("/");
  };

  return (
    <form className="manga-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Название"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Автор"
        value={author}
        onChange={e => setAuthor(e.target.value)}
      />
      <input
        type="date"
        value={finishedAt}
        onChange={e => setFinishedAt(e.target.value)}
      />
      <select
        value={rating}
        onChange={e => setRating(Number(e.target.value))}
      >
        {[1,2,3,4,5,6,7,8,9,10].map(r => (
          <option key={r} value={r}>{r}</option>
        ))}
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
      <button type="submit">Добавить</button>
    </form>
  );
}
