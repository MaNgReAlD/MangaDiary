import { useEffect, useState } from "react";
import { getComments, addComment } from "../services/commentService";
import type { Comment } from "../types";

interface Props {
  mangaId: string;
}

export default function CommentList({ mangaId }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    async function fetchComments() {
      const data = await getComments(mangaId);
      setComments(data);
    }
    fetchComments();
  }, [mangaId]);

  const handleAdd = async () => {
    if (!text.trim() || !author.trim()) return;
    await addComment(mangaId, {
      text,
      author,
      createdAt: new Date().toISOString()
    });
    const data = await getComments(mangaId);
    setComments(data);
    setText("");
    setAuthor("");
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
        value={author}
        onChange={e => setAuthor(e.target.value)}
        placeholder="Автор"
      />
      <input
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Комментарий..."
      />
      <button onClick={handleAdd}>Добавить</button>
    </div>
  );
}
