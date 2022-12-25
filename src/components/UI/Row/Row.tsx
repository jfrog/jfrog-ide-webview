import css from './Row.module.css'

export interface Props {
	title: string
	children?: React.ReactNode
	data: string
}

const Row = (props: Props) => (
	<div className={css.value}>
		<span className={css.key}>{props.title}: </span>
		<span>{props.data}</span>
		{props.children}
	</div>
)
export default Row