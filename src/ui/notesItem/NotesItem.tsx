import clsx from "clsx";
import type { Note } from "../../types/types";
import styles from "./NotesItem.module.css"
import { useNotesContext } from "../../contexts/NotesContext";

const getShortText = (text: string) => {
	let words = text.split(' ');
	let shortText = words.length > 7 ? words.slice(0, 7).join(' ') + '...' : text;
	return shortText
}

type Props = {
	note: Note
}

export const NotesItem = ({ note }: Props) => {
	const { activeNoteId, setActiveNoteId } = useNotesContext();

	const noteItemClass = clsx({
		[styles.item]: true,
		[styles.active]: activeNoteId === note.id
	})

	const handleClick = (id: string) => {
		setActiveNoteId(id)
	}

	return (
		<li
			className={noteItemClass}
			onClick={() => handleClick(note.id)}
		>
			<div className={styles.title}>{note.title}</div>
			<div className={styles.preview}>{getShortText(note.text)}</div>
			<div className={styles.date}>{note.date}</div>
		</li>
	)
}
