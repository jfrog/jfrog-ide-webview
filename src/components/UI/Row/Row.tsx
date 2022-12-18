import css from './Row.module.css'

export interface Props {
	title: string
	data: string
	key:number
}

const Row = (props: Props) => (
	<div key={props.key}>
		<span className={css.key}>{props.title}: </span>
		<span className={css.value}> {props.data}</span>
	</div>
)
export default Row