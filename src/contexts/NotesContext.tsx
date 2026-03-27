import { createContext, useContext, type ReactNode } from "react";
import { useNotes } from "../hooks/useNotes";
import type { Note } from "../types/types";

type NotesContextType = {
	notes: Note[] | null,
	isLoading: boolean;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined)

export const NotesProvider = ({ children }: { children: ReactNode}) => {
	const { notes, isLoading } = useNotes();

	const value = {
		notes,
		isLoading
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