import { useCallback, useEffect, useState } from "react";
import type { Note, useNotesReturn } from "../types/types";
import { getNotesList } from "../api/api";

type useNotesDataProps = {
	setError: (error: string | null) => void
}

export function useNotesData({setError}: useNotesDataProps): useNotesReturn {
	const [notes, setNotes] = useState<Note[] | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const loadNotesData = useCallback(async () => {
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
			setError('Ошибка загрузки данных');
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
	}
}