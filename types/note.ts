export type NoteTag = "Done" | "Undone";

export interface Note {
  id: string;
  title: string;
  content: string;
  tag: NoteTag;
  rate: number;
  createdAt: string;
  updatedAt: string;
}
