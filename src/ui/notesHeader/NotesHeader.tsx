import { MdMenuBook } from "react-icons/md";
import { SearchInput } from "../elements/SearchInput";
import { Button } from "../elements/Button"
import { FaPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import styles from './NotesHeader.module.css'

export const NotesHeader = () => {
	return (
		<div className={styles.header}>
			<h2><MdMenuBook />Мои записи</h2>
			<SearchInput />
			<div className={styles.actions}>
				<Button
					icon={<FaPlus />}
					title="Новая"
					onClick={() => { console.log('кнопка нажата Новая') }}
					color="blue"
				/>
				<Button
					icon={<IoClose/>}
					title="Очистить"
					onClick={() => { console.log('кнопка нажата Очистить') }}
					color="grey"
				/>
			</div>
		</div>
	)
}


