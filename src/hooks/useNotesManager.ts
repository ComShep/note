import { useEffect, useState } from "react";
import { useNotesData } from "./useNotesData";
import type { Note } from "../types/types";
import { createNewNote, deleteNoteApi, getNotesDetail, patchNotesDetail } from "../api/api";

export const useNotesManager = () => {
	const { notes, isLoading, setNotes } = useNotesData();

	const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
	const [activeNote, setActiveNote] = useState<Note | null>(null);
	const [isLoadingDetail, setIsLoadingDetail] = useState<boolean>(false);

	const [titleInputValue, setTitleInputValue] = useState<string>('');
	const [textInputValue, setTextInputValue] = useState<string>('');

	const [searchInputValue, setSearchInputValue] = useState<string>('');
	const [filteredNotes, setFilteredNotes] = useState<Note[] | null>(null);

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

				// Обновляем список
				setNotes(notes.map(note =>
					note.id === activeNoteId ? updatedNote : note
				));

				// Обновляем активную заметку
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

	const searchNotes = (query: string) => {
		setSearchInputValue(query);
	}

	const loadNoteDetail = async () => {
		setIsLoadingDetail(true);
		try {
			if (activeNoteId !== null) {
				const data = await getNotesDetail(activeNoteId);
				const loadedNote = {
					id: activeNoteId,
					...data
				}
				setActiveNote(loadedNote);

				setTitleInputValue(loadedNote.title)
				setTextInputValue(loadedNote.text)
			} else {
				setActiveNote(null)
			}
		} catch (err) {
			console.log(err);
			setActiveNote(null);
		} finally {
			setIsLoadingDetail(false)
		}
	}

	useEffect(() => {
		loadNoteDetail();
	}, [activeNoteId])

	useEffect(() => {
		if (!notes) {
			setFilteredNotes(null);
			return
		}

		if (!searchInputValue.trim()) {
			setFilteredNotes(notes);
			return 
		}

		const queryLowerCase = searchInputValue.toLowerCase();
		setFilteredNotes(notes.filter(note =>
			note.title.toLowerCase().includes(queryLowerCase) || note.text.toLowerCase().includes(queryLowerCase)
		))
	}, [notes, searchInputValue])

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
		setSearchInputValue,

		// сеттеры
		setActiveNoteId,
		setTitleInputValue,
		setTextInputValue,

		// действия
		addNewNote,
		editNoteDetail,
		deleteNote,
		searchNotes
	}
}