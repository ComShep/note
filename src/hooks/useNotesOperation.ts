import { useEffect, useState } from "react"
import type { Note } from "../types/types";
import { createNewNote, getNotesDetail } from "../api/api";

type Props = {
	notes: Note[] | null,
	setNotes: (notes: Array<Note>) => void
}

export const useNotesOperation = ({notes, setNotes}: Props) => {

	const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
	const [activeNote, setActiveNote] = useState<Note | null>(null);
	const [isLoadingDetail, setIsLoadingDetail] = useState<boolean>(false);

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

	useEffect(() => {
		loadNoteDetail();
	}, [activeNoteId])

	return {
		activeNoteId,
		setActiveNoteId,
		activeNote,
		isLoadingDetail,
		addNewNote
	}
}