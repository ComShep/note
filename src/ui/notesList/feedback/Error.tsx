import { FaRegFrownOpen } from "react-icons/fa";
import styles from "./Feedback.module.css";
import { Button } from "../../elements/Button";
import { useNotesContext } from "../../../contexts/NotesContext";

export const Error = () => {
	const { loadNotesData, notesDataError } = useNotesContext();

  return (
    <div className={styles.feedback}>
      <FaRegFrownOpen />
      <p>{notesDataError}</p>
      <Button color="blue" title="Повторить" onClick={loadNotesData} />
    </div>
  );
};
