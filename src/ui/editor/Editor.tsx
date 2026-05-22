import { IoIosSave } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import styles from './Editor.module.css'
import { useNotesContext } from "../../contexts/NotesContext";
import { useState, type ChangeEvent } from "react";
import { Button } from '../elements/Button';
import { Empty } from "./feedback/Empty";
import { Loading } from "./feedback/Loading";
import { Error } from "./feedback/Error";

export const Editor = () => {
	const { 
		activeNote, 
		titleInputValue, 
		setTitleInputValue, 
		textInputValue, 
		setTextInputValue, 
		deleteNote, 
		isLoadingDetail,
		noteDetailError,
		editNoteDetail
	} = useNotesContext();
	const [isSaveSuccess, setIsSaveSuccess] = useState<boolean>(false)

	const handleSave = () => {
			editNoteDetail();
	
			setIsSaveSuccess(true);

			setTimeout(() => {
				setIsSaveSuccess(false);
			}, 3000);
		
	};

	return (
		<section
			className={styles.container}>
				{isLoadingDetail && <Loading/>}
				{!isLoadingDetail && noteDetailError && <Error/>}
				{!isLoadingDetail && !noteDetailError &&  !activeNote && <Empty/>}
				{!isLoadingDetail && !noteDetailError && activeNote && (
					<>
						<div className={styles.header}>
							<input
								className={styles.title}
								placeholder='Введите заголовок записи...'
								value={titleInputValue}
								onChange={(e: ChangeEvent<HTMLInputElement>) => {setTitleInputValue(e.target.value)}}
							/>
						</div>
						<div className={styles.area}>
							<textarea
								className={styles.text}
								placeholder='Введите текст записи...'
								value={textInputValue}
								onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {setTextInputValue(e.target.value)}}
							></textarea>
							<div className={styles.actions}>
								<Button
									title='Сохранить'
									icon={<IoIosSave />}
									onClick={() => handleSave()}
									color="blue"
								/>
								{isSaveSuccess && <span>✅ Запись успешно сохранена!</span>}
								<Button
									title='Удалить'
									icon={<MdDelete />}
									onClick={() => deleteNote(activeNote.id)}
									color="red"
								/>
							</div>
						</div>
					</>
				)}
		</section>
	)
}