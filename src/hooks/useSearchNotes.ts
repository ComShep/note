import { useCallback, useEffect, useState } from "react";
import type { Note } from "../types/types";

type Props = {
	notes: Note[] | null
}

export const useSearchNotes = ({notes}: Props) => {
  const [searchInputValue, setSearchInputValue] = useState<string>("");
  const [filteredNotes, setFilteredNotes] = useState<Note[] | null>(null);

  const searchNotes = useCallback((query: string) => {
    setSearchInputValue(query);
  }, [setSearchInputValue]);


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
