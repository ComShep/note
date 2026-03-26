import { CiStickyNote } from "react-icons/ci";
import { FaRegFrownOpen } from "react-icons/fa";
import styles from './NotesList.module.css'

export const NotesList = () => {

	if (false) {
		return <div className={styles.container}>
			<div className={styles.empty}>
				<CiStickyNote />
				<p>У вас пока нет записей</p>
				<p>Нажмите "Новая запись", чтобы создать первую</p>
			</div>
		</div>
	}

	if (false) {
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

		</div>
	)
}


