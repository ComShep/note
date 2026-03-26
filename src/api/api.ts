import type { NotesResponse } from "../types/types"

const url = "https://vue-with-http-6c4e8-default-rtdb.europe-west1.firebasedatabase.app/"

export const getNotesApi = async (): Promise<NotesResponse> => {
	const response = await fetch(`${url}notes.json`);
	const data = await response.json();

	return data;
}