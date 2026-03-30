import { CiStickyNote } from "react-icons/ci";
import { FaRegFrownOpen } from "react-icons/fa";
import { AiOutlineClockCircle } from "react-icons/ai";
import styles from './NotesList.module.css'
import { NotesItem } from "../notesItem/NotesItem";
import { useNotesContext } from "../../contexts/NotesContext";


export const NotesList = () => {
	const { notes, isLoading, searchInputValue } = useNotesContext()
	
	if (isLoading) {
		return <div className={styles.container}>
			<div className={styles.empty}>
				<AiOutlineClockCircle />
				<p>Загрузка...</p>
			</div>
		</div>
	}

	if (notes?.length === 0 && !searchInputValue) {
		return <div className={styles.container}>
			<div className={styles.empty}>
				<CiStickyNote />
				<p>У вас пока нет записей</p>
				<p>Нажмите "Новая запись", чтобы создать первую</p>
			</div>
		</div>
	}

	if (notes?.length === 0 && searchInputValue) {
		return <div className={styles.container}>
			<div className={styles.empty}>
				<FaRegFrownOpen />
				<p>Ничего не нашлось</p>
				<p>Попробуйте ввести другой запрос</p>
			</div>
		</div>
	}

	return (
		<div className={styles.container}>
			<ul>
				{notes?.map(note => (
					<NotesItem
						key={note.id}
						note={note}
					/>
				))}
			</ul>
		</div>
	)
}


