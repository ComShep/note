import styles from './SerachInput.module.css';
import { FaSearch } from "react-icons/fa";

export const SearchInput = () => {
	return (
		<div className={styles.search}>
			<FaSearch />
			<input
				placeholder="Поиск по записям..."
			/>
		</div>
	)
}
