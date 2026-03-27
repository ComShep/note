export type Note = {
	id: string,
	title: string,
	text: string,
	date: string
}

export type NotesResponse = {
	[key: string]: {
		title: string,
		text: string,
		date: string
	}
}

export type NotesDetailResponse = {
	title: string,
	text: string,
	date: string
}

export type useNotesReturn = {
	notes: Array<Note> | null,
	isLoading: boolean
}
