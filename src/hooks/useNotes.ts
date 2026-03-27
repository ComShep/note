import { useEffect, useState } from "react";
import type { Note, useNotesReturn } from "../types/types";
import { getNotesList } from "../api/api";


export function useNotesData(): useNotesReturn {
	const [notes, setNotes] = useState<Note[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const loadNotesData = async () => {
		setIsLoading(true)
		try {
			const data = await getNotesList()
			const arrayOfData = Object.entries(data);
			const arrayOfNotes = arrayOfData.map(([id, note]) => ({
				id: id,
				...note
			}))
			setNotes(arrayOfNotes)
		} catch (err) {
			console.log(err)
		} finally  {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		loadNotesData()
	}, [])

	return {
		notes,
		isLoading
	}
}