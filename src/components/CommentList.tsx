import { useState, useEffect } from "react";
import "../styles/CommentList.css";
import type { Comment } from "../types";
import { dbRealtime } from "../firebase";
import { ref, push, remove, onValue } from "firebase/database";

interface Props {
  mangaId: string;
}

export default function CommentList({ mangaId }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const commentsRef = ref(dbRealtime, `comments/${mangaId}`);
    const unsubscribe = onValue(commentsRef, snapshot => {
      const data = snapshot.val();
      if (data) {
        const list = Object.entries(data).map(([id, value]) => ({
          id,
          ...(value as Omit<Comment, "id">),
        }));
        setComments(list);
      } else {
        setComments([]);
      }
    });
    return () => unsubscribe();
  }, [mangaId]);

  const handleAdd = async () => {
    if (!text.trim() || !author.trim()) return;
    const commentsRef = ref(dbRealtime, `comments/${mangaId}`);
    await push(commentsRef, {
      text,
      author,
      createdAt: new Date().toISOString(),
    });
    setText("");
    setAuthor("");
    setIsEditing(false);
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    const commentRef = ref(dbRealtime, `comments/${mangaId}/${id}`);
    await remove(commentRef);
  };

  return (
    <div className={`comments ${isEditing ? "editing" : ""}`}>
      <h4>Комментарии</h4>
      <ul>
        {comments.map(c => (
          <li key={c.id} className="comment-item">
            <span className="comment-author">{c.author}:</span>
            <span className="comment-text">{c.text}</span>
            <button className="delete-btn" onClick={() => handleDelete(c.id)}>Удалить</button>
          </li>
        ))}
      </ul>

      {isEditing ? (
        <div className="comment-form">
          <input
            type="text"
            placeholder="Ваш комментарий"
            value={text}
            onChange={e => setText(e.target.value)}
          />
          <input
            type="text"
            placeholder="Ваше имя"
            value={author}
            onChange={e => setAuthor(e.target.value)}
          />
          <button onClick={handleAdd}>Сохранить</button>
          <button onClick={() => setIsEditing(false)}>Отмена</button>
        </div>
      ) : (
        <button className="comment" onClick={() => setIsEditing(true)}>
          Добавить комментарий
        </button>
      )}
    </div>
  );
}
