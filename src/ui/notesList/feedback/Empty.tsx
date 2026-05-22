import { CiStickyNote } from "react-icons/ci";
import styles from "./Feedback.module.css";

export const Empty = () => {
  return (
    <div className={styles.feedback}>
      <CiStickyNote />
      <p>У вас пока нет записей</p>
      <p>Нажмите "Новая запись", чтобы создать первую</p>
    </div>
  );
};
