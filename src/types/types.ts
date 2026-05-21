export type Note = {
	id: string,
	title: string,
	text: string,
	date: string
}

export type NotesResponse = {
	[key: string]: NotesDetailResponse
}

export type NotesDetailResponse = {
	title: string,
	text: string,
	date: string
}

export type useNotesReturn = {
	notes: Array<Note> | null,
	setNotes: (notes: Array<Note>) => void,
	isLoading: boolean,
	setIsLoading: (isLoading: boolean) => void,
	loadNotesData: () => void,
	// error: string | null
}

export type NotesContextType = {
	allNotes: Note[] | null,
	notes: Note[] | null,

	isLoading: boolean;
	isLoadingDetail: boolean,

	activeNoteId: string | null,
	setActiveNoteId: (id: string) => void,
	activeNote: Note | null,

	addNewNote: () => void,
	deleteNote: (id: string) => void,
	editNoteDetail: () => void,

	titleInputValue: string,
	setTitleInputValue: (value: string) => void,
	textInputValue: string,
	setTextInputValue: (value: string) => void,

	searchInputValue: string,
	setSearchInputValue: (value: string) => void,
	searchNotes: (value: string) => void,

	error: string | null,
	loadNotesData: () => void,
}