import { useEffect, useState } from "react"
import type { Note } from "../types/types";
import { getNotesDetail } from "../api/api";

export const useNotesOperation = () => {
	const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
	const [activeNote, setActiveNote] = useState<Note | null>(null);
	const [isLoadingDetail, setIsLoadingDetail] = useState<boolean>(false)

	const loadNoteDetail = async () => {
		setIsLoadingDetail(true);
		if (activeNoteId !== null) {
			try {
				const data = await getNotesDetail(activeNoteId);
				setActiveNote({
					id: activeNoteId,
					...data
				})
			} catch (err) {
				console.log(err)
			} finally {
				setIsLoadingDetail(false)
			}
		}
	}

	useEffect(() => {
		loadNoteDetail();
	}, [activeNoteId])

	return {
		activeNoteId,
		setActiveNoteId,
		activeNote,
		isLoadingDetail
	}
}