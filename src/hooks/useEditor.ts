import { useEffect, useState } from "react";
import type { Note } from "../types/types";

export const useEditor = (activeNote: Note | null) => {

	const [titleInputValue, setTitleInputValue] = useState<string>('');
	const [textInputValue, setTextInputValue] = useState<string>('');

	useEffect(() => {
		if (activeNote) {
			setTitleInputValue(activeNote.title)
			setTextInputValue(activeNote.text)
		} else {
			setTitleInputValue('')
			setTextInputValue('')
		}

	}, [activeNote])

	return {
		titleInputValue,
		setTitleInputValue,
		textInputValue,
		setTextInputValue
	}
}