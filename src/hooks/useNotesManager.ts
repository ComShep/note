import { useNotesData } from "./useNotesData";
import { createNewNote, deleteNoteApi, patchNotesDetail } from "../api/api";
import { useNoteDetail } from "./useNoteDetail";
import { useSearchNotes } from "./useSearchNotes";

export const useNotesManager = () => {
	const { notes, isLoading, setNotes, loadNotesData, error } = useNotesData();
	const {	
		activeNoteId, 
		activeNote, 
		titleInputValue, 
		textInputValue,
		isLoadingDetail,
		setActiveNoteId,
		setActiveNote,
		setTitleInputValue,
		setTextInputValue
	} = useNoteDetail();
	const { searchInputValue, filteredNotes, searchNotes, setSearchInputValue } = useSearchNotes();

	const addNewNote = async () => {
		const newNote = await createNewNote();

		if (notes !== null) {
			setNotes([...notes, newNote])
			setActiveNoteId(newNote.id)
		} else {
			setNotes([newNote])
			setActiveNoteId(newNote.id)
		}
	}

	const editNoteDetail = async () => {
		if (!activeNoteId || !activeNote) return;

		const updatedNote = {
			...activeNote,
			title: titleInputValue.trim(),
			text: textInputValue.trim(),
			date: activeNote.date
		};

		if (notes !== null) {
			const prevNotes = [...notes];
			try {
				await patchNotesDetail(activeNoteId, updatedNote);
				
				setNotes(notes.map(note =>
					note.id === activeNoteId ? updatedNote : note
				));

				setActiveNote(updatedNote);
			} catch (err) {
				setNotes(prevNotes);
				console.log(err);
			}
		}
	};

	const deleteNote = async (id: string) => {
		if (notes !== null) {
			try {
				await deleteNoteApi(id);
				setNotes(notes.filter(note => note.id !== id))
				setActiveNoteId(null);
				setActiveNote(null);
				setTitleInputValue('');
				setTextInputValue('');
			} catch (err) {
				console.log(err)
			}
		}
	}

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
		error,
		

		// сеттеры
		setActiveNoteId,
		setTitleInputValue,
		setTextInputValue,
		setSearchInputValue,

		// действия
		loadNotesData,
		addNewNote,
		editNoteDetail,
		deleteNote,
		searchNotes
	}
}