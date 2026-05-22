import styles from './editor.module.css'

export const Empty = () => {
	return (
						<div className={styles.feedback}>
					<div>Выберите запись или создайте новую</div>
				</div>
	)
}
