import { IoIosSave } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import styles from './Editor.module.css'
import { useNotesContext } from "../../contexts/NotesContext";
import { type ChangeEvent } from "react";
import { Button } from '../elements/Button';

export const Editor = () => {
	const { 
		activeNote, 
		titleInputValue, 
		setTitleInputValue, 
		textInputValue, 
		setTextInputValue, 
		deleteNote, 
		isLoadingDetail,
		editNoteDetail
	} = useNotesContext();

	const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setTitleInputValue(event.target.value)
	}

	const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		setTextInputValue(event.target.value)
	}

	if (isLoadingDetail) {
		return (
			<div className={styles.container}>
				<div className={styles.empty}>
					<div>Загрузка...</div>
				</div>
			</div>
		)
	}

	if (!activeNote) {
		return (
			<div className={styles.container}>
				<div className={styles.empty}>
					<div>Выберите запись или создайте новую</div>
				</div>
			</div>
		)
	}

	return (
		<div
			className={styles.container}>
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
						onClick={() => editNoteDetail()}
						color="blue"
					/>
					<Button
						title='Удалить'
						icon={<MdDelete />}
						onClick={() => deleteNote(activeNote.id)}
						color="red"
					/>
				</div>
			</div>
		</div>
	)
}
