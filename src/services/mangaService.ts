import { db } from "../firebase";
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import type { Manga } from "../types";

const mangaCollection = collection(db, "manga");

export async function getMangaList(): Promise<Manga[]> {
  const snapshot = await getDocs(mangaCollection);
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Manga));
}

export async function addManga(manga: Omit<Manga, "id">): Promise<void> {
  await addDoc(mangaCollection, manga);
}

export async function deleteManga(id: string): Promise<void> {
  await deleteDoc(doc(db, "manga", id));
}
