import { Button } from "../elements/Button"
import { FaPlus } from "react-icons/fa";

export const NotesList = () => {
	return (
		<div>
			<Button
				icon={<FaPlus/>}
				title="button"
				onClick={() => {console.log('кнопка нажата')}}
				color="red"
			/>
		</div>
	)
}
