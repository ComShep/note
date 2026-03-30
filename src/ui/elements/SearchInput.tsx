import type { ChangeEvent } from 'react';
import { useNotesContext } from '../../contexts/NotesContext';
import styles from './SerachInput.module.css';
import { FaSearch } from "react-icons/fa";

export const SearchInput = () => {
	const { searchInputValue, setSearchInputValue, searchNotes } = useNotesContext();

	const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const newValue = event.target.value; 
		setSearchInputValue(newValue);
		searchNotes(newValue); 
	}

	return (
		<div className={styles.search}>
			<FaSearch />
			<input
			value={searchInputValue}
			onChange={handleSearchInputChange}
				placeholder="Поиск по записям..."
			/>
		</div>
	)
}
