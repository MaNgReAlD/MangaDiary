import { dbFirestore } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import type { Comment } from "../types";

export async function getComments(mangaId: string): Promise<Comment[]> {
  const commentsCollection = collection(dbFirestore, "manga", mangaId, "comments");
  const snapshot = await getDocs(commentsCollection);
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Comment));
}

export async function addComment(mangaId: string, comment: Omit<Comment, "id" | "mangaId">) {
  const commentsCollection = collection(dbFirestore, "manga", mangaId, "comments");
  await addDoc(commentsCollection, comment);
}
