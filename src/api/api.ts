import type { Note, NotesDetailResponse, NotesResponse } from "../types/types"

const url = "https://vue-with-http-6c4e8-default-rtdb.europe-west1.firebasedatabase.app/"

export const getNotesList = async (): Promise<NotesResponse> => {
	const response = await fetch(`${url}notes.json`);
	const data = await response.json();

	return data;
}

export const getNotesDetail = async (id:string): Promise<NotesDetailResponse> => {
	const response = await fetch(`${url}notes/${id}.json`);
	const data = await response.json();

	return data;
}

export const patchNotesDetail = async (id: string, activeNote: Note): Promise<NotesDetailResponse> => {
	const response = await fetch(`${url}notes/${id}.json`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			title: activeNote.title.trim(),
			text: activeNote.text.trim(),
			date: activeNote.date
		})		
	});

	if (!response.ok) {
		throw new Error('Ошибка обновления')
	}

	const result = response.json();
	return result
}

export const createNewNote = async (): Promise<Note> => {
	const newNote = {
		title: 'Новая запись',
		text: '',
		date: new Date().toLocaleString('ru-RU')
	}

	const response = await fetch(`${url}notes.json`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(newNote)
	})

	const result = await response.json();
	const id = result.name;

	return {
		id: id,
		...newNote
	}
}

export const deleteNoteApi = async (id:string): Promise<boolean> => {
	const response = await fetch(`${url}notes/${id}.json`, {
		method: "DELETE",
	});

	if (!response.ok) {
		throw new Error('Ошибка удаления')
	}

	return true;
}

