// import { IoIosSave } from "react-icons/io";
// import { MdDelete } from "react-icons/md";
import styles from './Editor.module.css'
import { useNotesContext } from "../../contexts/NotesContext";
import { useEffect, useState, type ChangeEvent } from "react";

export const Editor = () => {
	const { activeNote } = useNotesContext();
	const [titleInputValue, setTitleInputValue] = useState<string>('');

	useEffect(() => {
		if (activeNote) {
			setTitleInputValue(activeNote.title)
		} else {
			setTitleInputValue('')
		}

	}, [activeNote])

	const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setTitleInputValue(event.target.value)
	}

	if (activeNote === null) {
		return (
			<div className={styles.empty}>
				<div>Выберите запись или создайте новую</div>
			</div>
		)
	}

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<input
					className={styles.title}
					placeholder='Введите заголовок записи...'
					value={titleInputValue}
					onChange={handleTitleChange}
				/>
			</div>
			<div className={styles.area}></div>
		</div>
	)
}
