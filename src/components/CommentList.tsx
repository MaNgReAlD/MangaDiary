import { useEffect, useState } from "react";
import { getComments, addComment } from "../services/commentService";
import type { Comment } from "../types";

interface Props {
  mangaId: string;
}

export default function CommentList({ mangaId }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    async function fetchComments() {
      const data = await getComments(mangaId);
      setComments(data);
    }
    fetchComments();
  }, [mangaId]);

  const handleAdd = async () => {
    if (!text.trim()) return;
    await addComment(mangaId, {
      text,
      author: "Аноним",
      createdAt: new Date().toISOString()
    });
    const data = await getComments(mangaId);
    setComments(data);
    setText("");
  };

  return (
    <div className="comments">
      <h4>Комментарии</h4>
      <ul>
        {comments.map(c => (
          <li key={c.id}>
            <b>{c.author}:</b> {c.text}
          </li>
        ))}
      </ul>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Напиши комментарий..."
      />
      <button onClick={handleAdd}>Добавить</button>
    </div>
  );
}
