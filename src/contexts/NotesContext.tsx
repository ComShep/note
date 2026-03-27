import { createContext, useContext, type ReactNode } from "react";
import { useNotesData } from "../hooks/useNotes";
import type { Note } from "../types/types";
import { useNotesOperation } from "../hooks/useNotesOperation";

type NotesContextType = {
	notes: Note[] | null,
	isLoading: boolean;
	activeNoteId: string | null,
	setActiveNoteId: (id: string) => void,
	activeNote: Note | null
	isLoadingDetail: boolean
}

const NotesContext = createContext<NotesContextType | undefined>(undefined)

export const NotesProvider = ({ children }: { children: ReactNode }) => {
	const { notes, isLoading } = useNotesData();
	const {
		activeNoteId,
		setActiveNoteId,
		activeNote,
		isLoadingDetail
	} = useNotesOperation();

	const value = {
		notes,
		isLoading,
		activeNoteId,
		setActiveNoteId,
		activeNote,
		isLoadingDetail
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