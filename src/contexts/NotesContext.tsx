import { createContext, useContext, type ReactNode } from "react";
import { useNotesData } from "../hooks/useNotesData";
import type { Note } from "../types/types";
import { useNotesOperation } from "../hooks/useNotesOperation";

type NotesContextType = {
	notes: Note[] | null,
	isLoading: boolean;
	activeNoteId: string | null,
	setActiveNoteId: (id: string) => void,
	activeNote: Note | null
	isLoadingDetail: boolean,
	addNewNote: () => void,
}

const NotesContext = createContext<NotesContextType | undefined>(undefined)

export const NotesProvider = ({ children }: { children: ReactNode }) => {
	const { notes, isLoading, setNotes } = useNotesData();
	const {
		activeNoteId,
		setActiveNoteId,
		activeNote,
		isLoadingDetail,
		addNewNote
	} = useNotesOperation({notes, setNotes});

	const value = {
		notes,
		isLoading,
		activeNoteId,
		setActiveNoteId,
		activeNote,
		isLoadingDetail,
		addNewNote
	};

	return (
		<NotesContext.Provider value={value}>
			{children}
		</NotesContext.Provider>
	)
}

export const useNotesContext = () => {
	const context = useContext(NotesContext);

	if (context === undefined) {
		throw new Error('useNotesContext must be used within NotesProvider')
	}

	return context;
}