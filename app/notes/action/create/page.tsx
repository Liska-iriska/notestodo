import css from "./CreateNote.module.css";
import { Metadata } from "next";
import NoteForm from "@/components/NoteForm/NoteForm";

export const metadata: Metadata = {
  title: "Create a new note | NOTEStodo",
  description: "Create a new note with NOTEStodo.",
  openGraph: {
    title: "Create a new note | NOTEStodo",
    description: "Create a new note with NOTEStodo.",
    url: "https://notestodo-gold.vercel.app/notes/action/create",
    images: [
      {
        url: "https://notestodo-gold.vercel.app/notestodo_logo.png",
        width: 1200,
        height: 630,
        alt: "Create a note",
      },
    ],
  },
};

export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
