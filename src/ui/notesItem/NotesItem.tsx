import clsx from "clsx";
import type { Note } from "../../types/types";
import styles from "./NotesItem.module.css"

const getShortText = (text: string) => {
	let words = text.split(' ');
	let shortText = words.length > 7 ? words.slice(0, 7).join(' ') + '...' : text;
	return shortText
}

type Props = {
	note: Note
}

export const NotesItem = ({ note }: Props) => {

	const noteItemClass = clsx({
		[styles.item]: true,
		[styles.active]: true
	})

	return (
		<li
			className={noteItemClass}
			onClick={() => { console.log('выбарана карточка') }}
		>
			<div className={styles.title}>{note.title}</div>
			<div className={styles.preview}>{getShortText(note.text)}</div>
			<div className={styles.date}>{note.date}</div>
		</li>
	)
}
