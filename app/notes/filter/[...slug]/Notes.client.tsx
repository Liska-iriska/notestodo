"use client";

import { useState } from "react";
import Link from "next/link";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import Sortation from "@/components/Sortation/Sortation";
import css from "./Notes.module.css";

interface Props {
  tag?: string;
}

export default function NotesClient({ tag }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setQuery(value);
    setCurrentPage(1);
  }, 500);

  const { data, isLoading } = useQuery({
    queryKey: ["notes", { page: currentPage, search: query, tag, sortOrder }],
    queryFn: () => fetchNotes(query, currentPage, 12, tag, "rate", sortOrder),
    placeholderData: keepPreviousData,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={debouncedSearch} />
        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>
      <div className={css.sortBy}>
        Sort by: <Sortation sortOrder={sortOrder} onSortChange={setSortOrder} />
      </div>
      <p className={css.hint}>
        Switch between &quot;Done&quot; and &quot;Undone&quot; instantly with a
        single click!
      </p>

      {isLoading ? (
        <p className={css.loader}>
          Loading...⏳ First request may take up to 50 seconds while the server
          wakes up.
        </p>
      ) : (
        notes.length > 0 && <NoteList notes={notes} onSelect={() => {}} />
      )}

      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
