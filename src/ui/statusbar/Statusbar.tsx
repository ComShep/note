import { useNotesContext } from "../../contexts/NotesContext";
import styles from "./Statusbar.module.css"

export const Statusbar = () => {
	const { allNotes, notes, searchInputValue } = useNotesContext();
	const year = new Date().getFullYear();

	const getRecordsText = (count: number | null) => {
		if (count === null) {
			return 
		}

		const forms = ['запись', 'записи', 'записей'];
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

	// const renderSearchStatus = () => {
	// 	return <span className={styles.status}>Поиск: "{searchInputValue}" ({getRecordsText(notes.length)})</span>
	// }

	return (
		<div className={styles.statusbar}>
			<div className={styles.bar_info}>
				Всего записей: <span className={styles.total}>{allNotes?.length}</span>
				{searchInputValue.length ? <span className={styles.status}>Поиск: "{searchInputValue}" ({getRecordsText(notes?.length)})</span> : ''}
			</div>
			<div className={styles.bar_copy}>Блокнот для записей © {year}</div>
		</div>
	)
}
