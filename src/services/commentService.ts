import { dbRealtime } from "../firebase";
import { ref, push, set, get, remove } from "firebase/database";
import type { Comment } from "../types";

export async function getComments(mangaId: string): Promise<Comment[]> {
  const snapshot = await get(ref(dbRealtime, `comments/${mangaId}`));
  if (snapshot.exists()) {
    const data = snapshot.val() as Record<string, Omit<Comment, "id">>;
    return Object.entries(data).map(([id, value]) => ({
      id,
      ...(value as Omit<Comment, "id">)
    }));
  }
  return [];
}

export async function addComment(mangaId: string, comment: Omit<Comment, "id" | "mangaId">): Promise<Comment> {
  const newRef = push(ref(dbRealtime, `comments/${mangaId}`));
  const newComment: Comment = {
    id: newRef.key!,
    mangaId,
    ...comment
  };
  await set(newRef, newComment);
  return newComment;
}

export async function deleteComment(mangaId: string, commentId: string): Promise<void> {
  await remove(ref(dbRealtime, `comments/${mangaId}/${commentId}`));
}
