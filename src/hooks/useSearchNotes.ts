import { useEffect, useState } from "react";
import type { Note } from "../types/types";
import { useNotesData } from "./useNotesData";

export const useSearchNotes = () => {
	const { notes } = useNotesData();
  const [searchInputValue, setSearchInputValue] = useState<string>("");
  const [filteredNotes, setFilteredNotes] = useState<Note[] | null>(null);

  const searchNotes = (query: string) => {
    setSearchInputValue(query);
  };

  useEffect(() => {
    if (!notes) {
      setFilteredNotes(null);
      return;
    }

    if (!searchInputValue.trim()) {
      setFilteredNotes(notes);
      return;
    }

    const queryLowerCase = searchInputValue.toLowerCase();
    setFilteredNotes(
      notes.filter(
        (note) =>
          note.title.toLowerCase().includes(queryLowerCase) ||
          note.text.toLowerCase().includes(queryLowerCase),
      ),
    );
  }, [notes, searchInputValue]);

  return {
    searchInputValue,
    filteredNotes,

    searchNotes,
    setSearchInputValue,
    setFilteredNotes,
  };
};
