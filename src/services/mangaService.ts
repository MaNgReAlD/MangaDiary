import { dbFirestore } from "../firebase";
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import type { Manga } from "../types";

const mangaCollection = collection(dbFirestore, "manga");

export async function getMangaList(): Promise<Manga[]> {
  const snapshot = await getDocs(mangaCollection);
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Manga));
}

export async function addManga(manga: Omit<Manga, "id">): Promise<void> {
  await addDoc(mangaCollection, manga);
}

export async function deleteManga(id: string): Promise<void> {
  await deleteDoc(doc(dbFirestore, "manga", id));
}

export async function updateManga(manga: Manga): Promise<void> {
  const { id, ...data } = manga; 
  const mangaRef = doc(dbFirestore, "manga", id);
  await updateDoc(mangaRef, data);
}
