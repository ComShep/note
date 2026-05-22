import styles from './NotesList.module.css'
import { NotesItem } from "../notesItem/NotesItem";
import { useNotesContext } from "../../contexts/NotesContext";
import { Loading } from "./feedback/Loading";
import { Error } from './feedback/Error';
import { Empty } from './feedback/Empty';
import { NoSearchResult } from './feedback/NoSearchResult';

export const NotesList = () => {
	const { notes, isLoading, searchInputValue, notesDataError } = useNotesContext();

	return (
		<div className={styles.container}>
			{isLoading && <Loading/>}
			{!isLoading && notesDataError && <Error/>}
			{!isLoading && !notesDataError && notes?.length === 0 && !searchInputValue && <Empty/>}
			{!isLoading && !notesDataError && notes?.length === 0 && searchInputValue && <NoSearchResult/>}
			{!isLoading && !notesDataError && notes && !searchInputValue && (
				<ul>
				{notes?.map(note => (
					<NotesItem
						key={note.id}
						note={note}
					/>
				))}
				</ul>
			)}
		</div>
	)
}


