import styles from './editor.module.css'

export const Loading = () => {
  return (
    <div className={styles.feedback}>
      <div>Загрузка...</div>
    </div>
  );
};
