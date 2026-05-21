import { useCallback, useEffect, useState } from "react";
import type { Note } from "../types/types";
import { getNotesDetail } from "../api/api";

export const useNoteDetail = () => {
	const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
	const [activeNote, setActiveNote] = useState<Note | null>(null);
	const [isLoadingDetail, setIsLoadingDetail] = useState<boolean>(false);

	const [titleInputValue, setTitleInputValue] = useState<string>('');
	const [textInputValue, setTextInputValue] = useState<string>('');

	const loadNoteDetail = useCallback(async () => {
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
	}, [activeNoteId])

	useEffect(() => {
		loadNoteDetail();
	}, [activeNoteId])

	return {
		activeNoteId,
		activeNote,
		titleInputValue,
		textInputValue,
		isLoadingDetail,
		setActiveNoteId,
		setActiveNote,
		setTitleInputValue,
		setTextInputValue
	}
}