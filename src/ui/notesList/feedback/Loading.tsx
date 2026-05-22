import { AiOutlineClockCircle } from "react-icons/ai";
import styles from './Feedback.module.css'

export const Loading = () => {
  return (
    <div className={styles.feedback}>
      <AiOutlineClockCircle />
      <p>Загрузка...</p>
    </div>
  );
};
