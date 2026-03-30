import { createContext, useContext, type ReactNode } from "react";
import type { NotesContextType } from "../types/types";
import { useNotesManager } from "../hooks/useNotesManager";

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