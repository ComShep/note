import { useCallback, useEffect, useState } from "react";
import type { Note, useNotesReturn } from "../types/types";
import { getNotesList } from "../api/api";

export function useNotesData(): useNotesReturn {
	const [notes, setNotes] = useState<Note[] | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [notesDataError, setNotesDataError] = useState<string | null>(null);

	const loadNotesData = useCallback(async () => {
		setNotesDataError(null)
		try {
			const data = await getNotesList();

			if (!data) {
				setNotes([]);
				return;
			}

			const arrayOfData = Object.entries(data);
			const arrayOfNotes = arrayOfData.map(([id, note]) => ({
				id: id,
				...note
			}))
			setNotes(arrayOfNotes)
		} catch (err) {
			console.log(err)
			setNotesDataError('Ошибка загрузки списка записей');
			setNotes([]);
		} finally  {
			setIsLoading(false)
		}
	}, [])

	useEffect(() => {
		loadNotesData()
	}, [])

	return {
		notes,
		setNotes,
		isLoading,
		setIsLoading,
		loadNotesData,
		notesDataError
	}
}