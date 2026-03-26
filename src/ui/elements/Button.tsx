import styles from './Button.module.css'
import clsx from 'clsx'
import type { ReactNode } from 'react'

type Props = {
	icon: ReactNode,
	title: string
	color: string
	onClick: () => void
}

export const Button = ({icon, title, color, onClick}: Props) => {

	const btnClass = clsx({
		[styles.button]: true,
		[styles[color]]: true
	})

	return (
		<button
			className={btnClass}
			onClick={onClick}
		>
			{icon}
			{title}
		</button>
	)
}
