import { IoIosSave } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import styles from './Editor.module.css'
import { useNotesContext } from "../../contexts/NotesContext";
import { type ChangeEvent } from "react";
import { Button } from '../elements/Button';

export const Editor = () => {
	const { activeNote, titleInputValue, setTitleInputValue, textInputValue, setTextInputValue } = useNotesContext();

	const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setTitleInputValue(event.target.value)
	}

	const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		setTextInputValue(event.target.value)
	}

	if (activeNote === null) {
		return (
			<div className={styles.empty}>
				<div>Выберите запись или создайте новую</div>
			</div>
		)
	}

	return (
		<div
			className={styles.container}
			key={activeNote.id}>
			<div className={styles.header}>
				<input
					className={styles.title}
					placeholder='Введите заголовок записи...'
					value={titleInputValue}
					onChange={handleTitleChange}
				/>
			</div>
			<div className={styles.area}>
				<textarea
					className={styles.text}
					placeholder='Введите текст записи...'
					value={textInputValue}
					onChange={handleTextChange}
				></textarea>
				<div className={styles.actions}>
					<Button
						title='Сохранить'
						icon={<IoIosSave />}
						onClick={() => { }}
						color="blue"
					/>
					<Button
						title='Удалить'
						icon={<MdDelete/>}
						onClick={() => { }}
						color="red"
					/>
				</div>
			</div>
		</div>
	)
}
