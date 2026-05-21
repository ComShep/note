import { useCallback, useEffect, useState } from "react";
import type { Note, NoteDetailErrorType, } from "../types/types";
import { getNotesDetail } from "../api/api";

export const useNoteDetail = () => {
	const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
	const [activeNote, setActiveNote] = useState<Note | null>(null);
	const [isLoadingDetail, setIsLoadingDetail] = useState<boolean>(false);

	const [noteDetailError, setNoteDetailError] = useState<string | null>(null);
	const [noteDetailErrorType, setNoteDetailErrorType] = useState<NoteDetailErrorType>(null);

	const [titleInputValue, setTitleInputValue] = useState<string>('');
	const [textInputValue, setTextInputValue] = useState<string>('');

	const loadNoteDetail = useCallback(async () => {
		setIsLoadingDetail(true);
		setNoteDetailError(null);
		setNoteDetailErrorType(null);
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
			setNoteDetailError('Ошибка загрузки записи');
			setNoteDetailErrorType('load')
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
		setIsLoadingDetail,
		setActiveNoteId,
		setActiveNote,
		setTitleInputValue,
		setTextInputValue,
		loadNoteDetail,
		noteDetailError,
		setNoteDetailError,
		noteDetailErrorType,
		setNoteDetailErrorType
	}
}