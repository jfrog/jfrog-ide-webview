import css from './Filter.module.css'
export interface Props {
  filter: string
  setFilter: (e: string) => void
}

export default function Filter(props: Props): JSX.Element {
	const typeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
		props.setFilter(e.target.value)
	}

	return (
		<input
			className={css.input}
			aria-label="Filter nodes"
			id="search"
			type="text"
			placeholder="Filter nodes..."
			value={props.filter}
			onChange={typeHandler}/>
	)
}