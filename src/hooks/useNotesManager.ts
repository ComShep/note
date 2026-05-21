import { useNotesData } from "./useNotesData";
import { createNewNote, deleteNoteApi, patchNotesDetail } from "../api/api";
import { useNoteDetail } from "./useNoteDetail";
import { useSearchNotes } from "./useSearchNotes";
import { useCallback } from "react";

export const useNotesManager = () => {
  const { notes, isLoading, setNotes, loadNotesData, notesDataError } =
    useNotesData();
  const {
    activeNoteId,
    activeNote,
    titleInputValue,
    textInputValue,
    isLoadingDetail,
    setActiveNoteId,
    setActiveNote,
    setTitleInputValue,
    setTextInputValue,
    noteDetailError,
    loadNoteDetail,
    setIsLoadingDetail,
		setNoteDetailError,
		noteDetailErrorType,
		setNoteDetailErrorType
  } = useNoteDetail();
  const { searchInputValue, filteredNotes, searchNotes, setSearchInputValue } =
    useSearchNotes({ notes });

  const addNewNote = useCallback(async () => {
    setIsLoadingDetail(true);
		setNoteDetailError(null);
		setNoteDetailErrorType(null);
    try {
      const newNote = await createNewNote();
      if (notes !== null) {
        setNotes([...notes, newNote]);
        setActiveNoteId(newNote.id);
      } else {
        setNotes([newNote]);
        setActiveNoteId(newNote.id);
      }
    } catch (err) {
			console.log(err);
			setNoteDetailError('Ошибка создания записи');
			setNoteDetailErrorType('create')
    } finally {
      setIsLoadingDetail(false);
    }
  }, [notes, setNotes, setActiveNoteId]);

  const editNoteDetail = useCallback(async () => {
    if (!activeNoteId || !activeNote) return;

    const updatedNote = {
      ...activeNote,
      title: titleInputValue.trim(),
      text: textInputValue.trim(),
      date: activeNote.date,
    };

    if (notes !== null) {
      const prevNotes = [...notes];
      try {
        await patchNotesDetail(activeNoteId, updatedNote);

        setNotes(
          notes.map((note) => (note.id === activeNoteId ? updatedNote : note)),
        );

        setActiveNote(updatedNote);
      } catch (err) {
        setNotes(prevNotes);
        console.log(err);
      } finally {
				
			}
    }
  }, [
    activeNoteId,
    activeNote,
    titleInputValue,
    textInputValue,
    notes,
    setNotes,
    setActiveNote,
  ]);

  const deleteNote = useCallback(
    async (id: string) => {
      if (notes !== null) {
        try {
          await deleteNoteApi(id);
          setNotes(notes.filter((note) => note.id !== id));
          setActiveNoteId(null);
          setActiveNote(null);
          setTitleInputValue("");
          setTextInputValue("");
        } catch (err) {
          console.log(err);
        }
      }
    },
    [
      notes,
      setNotes,
      setActiveNoteId,
      setActiveNote,
      setTitleInputValue,
      setTextInputValue,
    ],
  );

  return {
    // данные
    allNotes: notes,
    notes: filteredNotes,
    isLoading,
    activeNoteId,
    activeNote,
    isLoadingDetail,
    titleInputValue,
    textInputValue,
    searchInputValue,
    notesDataError,
    noteDetailError,
		noteDetailErrorType,

    // сеттеры
    setActiveNoteId,
    setTitleInputValue,
    setTextInputValue,
    setSearchInputValue,

    // действия
    loadNotesData,
    loadNoteDetail,
    addNewNote,
    editNoteDetail,
    deleteNote,
    searchNotes,
  };
};
