import styles from './Header.module.css'
import { MdOutlineNoteAlt } from "react-icons/md";

export const Header = () => {
	return (
		<header className={styles.header}>
			<h1 className={styles.title}>
				<MdOutlineNoteAlt />
				Блокнот для записей с поиском
			</h1>
			<p className={styles.subtitle}>Создавайте, ищите и редактируйте ваши заметки</p>
		</header>
	)
}
