import css from "./NoteList.module.css";
import type { Note, NoteTag } from "../../types/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote, updateNote } from "../../lib/api/clientApi";
import Link from "next/link";

interface NoteListProps {
  onSelect: (note: Note) => void;
  notes: Note[];
}

export default function NoteList({ onSelect, notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const tagMutation = useMutation({
    mutationFn: ({ id, tag }: { id: string; tag: NoteTag }) =>
      updateNote(id, { tag }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  if (notes.length === 0) {
    return null;
  }
  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li
          className={css.listItem}
          onClick={() => onSelect(note)}
          key={note._id}
        >
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <p className={css.rate}>Importance: {note.rate}</p>
          <div className={css.footer}>
            <span
              className={css.tag}
              onClick={(e) => {
                e.stopPropagation();
                tagMutation.mutate({
                  id: note._id,
                  tag: note.tag === "Done" ? "Undone" : ("Done" as NoteTag),
                });
              }}
              style={{ cursor: "pointer" }}
            >
              {note.tag}
            </span>
            <Link href={`/notes/${note._id}`} className={css.link}>
              View details
            </Link>
            <button
              className={css.button}
              disabled={mutation.isPending}
              onClick={(e) => {
                e.stopPropagation();
                mutation.mutate(note._id);
              }}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
