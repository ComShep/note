import { createContext, useContext, type ReactNode } from "react";
import type { Note } from "../types/types";
import { useNotesManager } from "../hooks/useNotesManager";

type NotesContextType = {
	notes: Note[] | null,
	isLoading: boolean;
	activeNoteId: string | null,
	setActiveNoteId: (id: string) => void,
	activeNote: Note | null
	isLoadingDetail: boolean,
	addNewNote: () => void,
	deleteNote: (id: string) => void,
	editNoteDetail: () => void,
	titleInputValue: string,
	setTitleInputValue: (value: string) => void,
	textInputValue: string,
	setTextInputValue: (value: string) => void
}

const NotesContext = createContext<NotesContextType | undefined>(undefined)

export const NotesProvider = ({ children }: { children: ReactNode }) => {
	const notesManager = useNotesManager();

	return (
		<NotesContext.Provider value={notesManager}>
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