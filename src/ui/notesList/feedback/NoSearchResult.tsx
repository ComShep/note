import styles from "./Feedback.module.css";
import { FaRegFrownOpen } from "react-icons/fa";

export const NoSearchResult = () => {
  return (
    <div className={styles.feedback}>
      <FaRegFrownOpen />
      <p>Ничего не нашлось</p>
      <p>Попробуйте ввести другой запрос</p>
    </div>
  );
};
