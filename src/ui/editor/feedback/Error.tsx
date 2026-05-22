import { useNotesContext } from "../../../contexts/NotesContext";
import { Button } from "../../elements/Button";
import styles from './Feedback.module.css'

export const Error = () => {
  const {
    activeNote,
    noteDetailErrorType,
    loadNoteDetail,
    noteDetailError,
    addNewNote,
    editNoteDetail,
    deleteNote,
  } = useNotesContext();

  const handleRetry = () => {
    switch (noteDetailErrorType) {
      case "load":
        loadNoteDetail();
        break;
      case "create":
        addNewNote();
        break;
      case "edit":
				activeNote ? editNoteDetail() : console.log(noteDetailError);
				break;
      case "delete":
				activeNote ? deleteNote(activeNote.id) : console.log(noteDetailError);
        break;
    }
  };

  return (
    <div className={styles.feedback}>
      <div>{noteDetailError}</div>
      <Button color="blue" title="Повторить" onClick={handleRetry} />
    </div>
  );
};
