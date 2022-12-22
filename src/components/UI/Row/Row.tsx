import css from './Row.module.css'

export interface Props {
	title: string
	data: string
}

const Row = (props: Props) => (
	<div>
		<span className={css.key}>{props.title}: </span>
		<span className={css.value}>{props.data}</span>
	</div>
)
export default Row