import styles from './MainPage.module.css'
import { Editor } from './ui/editor/Editor'
import { Header } from './ui/header/Header'
import { Statusbar } from './ui/statusbar/Statusbar'
import { NotesHeader } from './ui/notesHeader/NotesHeader'
import { NotesList } from './ui/notesList/NotesList'
import { NotesProvider } from './contexts/NotesContext'


export const MainPage = () => {

	return (
		<div className={styles.wrapper}>
			<Header />
			<NotesProvider>
				<div className={styles.list}>
					<div className={styles.notes}>
						<NotesHeader />
						<NotesList/>
					</div>
					<Editor />
				</div>
				<Statusbar />
			</NotesProvider>
		</div>
	)
}
