import type { Note, NotesDetailResponse, NotesResponse } from "../types/types";

const url =
  "https://vue-with-http-6c4e8-default-rtdb.europe-west1.firebasedatabase.app/";

	const testUrl =
  "https://vue-with-http-6c4e8-default-rtdb.europe-west1.firebasedatabase1.app/";

export const getNotesList = async (): Promise<NotesResponse> => {
  try {
    const response = await fetch(`${url}notes.json`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getNotesDetail = async (
  id: string,
): Promise<NotesDetailResponse> => {
  try {
    const response = await fetch(`${testUrl}notes/${id}.json`);
    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
};

export const createNewNote = async (): Promise<Note> => {
  try {
    const newNote = {
      title: "Новая запись",
      text: "",
      date: new Date().toLocaleString("ru-RU"),
    };

    const response = await fetch(`${url}notes.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newNote),
    });

    const result = await response.json();
    const id = result.name;

    return {
      id: id,
      ...newNote,
    };
  } catch (error) {
    throw error;
  }
};

export const patchNotesDetail = async (id: string,activeNote: Note,): Promise<NotesDetailResponse> => {
  try {
    const response = await fetch(`${url}notes/${id}.json`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: activeNote.title.trim(),
        text: activeNote.text.trim(),
        date: activeNote.date,
      }),
    });

    const result = response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const deleteNoteApi = async (id: string): Promise<boolean> => {
	try {
		const response = await fetch(`${url}notes/${id}.json`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Ошибка удаления");
  }

  return true;
	} catch (error) {
		throw error;
	}
};
