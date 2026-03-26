import styles from './MainPage.module.css'
import { Editor } from './ui/editor/Editor'
import { Header } from './ui/header/Header'
import { NotesList } from './ui/notesList/NotesList'
import { Statusbar } from './ui/statusbar/Statusbar'


export const MainPage = () => {
	console.log(new Date().toLocaleString('ru-RU'))

	return (
		<div className={styles.wrapper}>
			<Header/>
			<div className={styles.list}>
				<NotesList/>
				<Editor/>
			</div>
			<Statusbar/>
		</div>
	)
}
