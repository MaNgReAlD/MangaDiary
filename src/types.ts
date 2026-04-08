export interface Manga {
  id: string;
  title: string;
  author: string;
  rating: number;
  note?: string;
  imageUrl?: string;
  finishedAt?: string;
}

export interface Comment {
  id?: string;
  mangaId: string;
  text: string;
  author: string;
  createdAt: string;
}
