import css from './Row.module.css'

export interface Props {
	title: string
	children?: React.ReactNode
	data: string
}

export default function Row(props: Props): JSX.Element {
	return (
		<div className={css.value}>
			<span className={css.key}>{props.title}: </span>
			<span>{props.data}</span>
			{props.children}
		</div>
	)
}
