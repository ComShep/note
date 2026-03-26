import { useEffect, useState } from "react";
import type { Note, useNotesReturn } from "../types/types";
import { getNotesApi } from "../api/api";


export function useNotes(): useNotesReturn {
	const [notes, setNotes] = useState<Note[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const loadNotesData = async () => {
		setIsLoading(true)
		try {
			const data = await getNotesApi()
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