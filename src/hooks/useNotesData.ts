import { useEffect, useState } from "react";
import type { Note, useNotesReturn } from "../types/types";
import { getNotesList } from "../api/api";


export function useNotesData(): useNotesReturn {
	const [notes, setNotes] = useState<Note[] | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null)

	const loadNotesData = async () => {
		setIsLoading(true);
		setError(null)
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
			setError('Ошибка загрузки данных')
		} finally  {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		loadNotesData()
	}, [])

	return {
		notes,
		setNotes,
		isLoading,
		loadNotesData,
		error,
	}
}