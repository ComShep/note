import styles from './MainPage.module.css'
import { Editor } from './ui/editor/Editor'
import { Header } from './ui/header/Header'
import { Statusbar } from './ui/statusbar/Statusbar'
import { NotesHeader } from './ui/notesHeader/NotesHeader'
import { NotesList } from './ui/notesList/NotesList'
import { useNotes } from './hooks/useNotes'


export const MainPage = () => {
	const {notes, isLoading} = useNotes();
	console.log(new Date().toLocaleString('ru-RU'))

	return (
		<div className={styles.wrapper}>
			<Header />
			<div className={styles.list}>
				<div className={styles.notes}>
					<NotesHeader />
					<NotesList 
						notes={notes}
						isLoading={isLoading}
					/>
				</div>
				<Editor />
			</div>
			<Statusbar />
		</div>
	)
}
