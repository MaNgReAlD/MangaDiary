import { dbRealtime } from "../firebase";
import { ref, push, set, get, update, remove } from "firebase/database";
import type { Manga } from "../types";

export async function getMangaList(): Promise<Manga[]> {
  const snapshot = await get(ref(dbRealtime, "manga"));
  if (snapshot.exists()) {
    const data = snapshot.val() as Record<string, Omit<Manga, "id">>;
    return Object.entries(data).map(([id, value]) => ({ id, ...(value as Omit<Manga, "id">) }));
  }
  return [];
}

export async function addManga(manga: Omit<Manga, "id">): Promise<Manga> {
  const newRef = push(ref(dbRealtime, "manga"));
  await set(newRef, manga);
  return { id: newRef.key!, ...manga };
}

export async function deleteManga(id: string): Promise<void> {
  await remove(ref(dbRealtime, `manga/${id}`));
}

export async function updateManga(manga: Manga): Promise<void> {
  const { id, ...data } = manga;
  await update(ref(dbRealtime, `manga/${id}`), data);
}
