import { useNotesContext } from "../../contexts/NotesContext";
import type { Note } from "../../types/types";
import styles from "./Statusbar.module.css"

export const Statusbar = () => {
	const { allNotes, notes, searchInputValue } = useNotesContext();
	const year = new Date().getFullYear();

	const getRecordsText = (notes: Note[] | null) => {
		const forms = ['запись', 'записи', 'записей'];
		let count = notes === null ? 0 : notes.length

		const lastDigit = count % 10;
		const lastTwoDigits = count % 100;

		let form;
		if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
			form = forms[2];
		} else if (lastDigit === 1) {
			form = forms[0];
		} else if (lastDigit >= 2 && lastDigit <= 4) {
			form = forms[1];
		} else {
			form = forms[2];
		}

		return `${count} ${form}`;
	}

	return (
		<div className={styles.statusbar}>
			<div className={styles.bar_info}>
				Всего записей: <span className={styles.total}>{allNotes?.length}</span>
				{searchInputValue && (
					<span className={styles.status}>Поиск: "{searchInputValue}" ({getRecordsText(notes)})</span>
				)}
			</div>
			<div className={styles.bar_copy}>Блокнот для записей © {year}</div>
		</div>
	)
}
