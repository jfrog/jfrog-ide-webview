import Filter from './Filter'
import css from './Header.module.css'
export interface Props {
  filter: string
  setFilter: (filter: string) => void
  setActiveNode: (node: string) => void
}

export default function Header(props: Props) {
	const handleClick = () => {
		props.setActiveNode('')
		props.setFilter('')
	}

	return (
		<header className={css.container}>
			<Filter filter={props.filter} setFilter={props.setFilter}/>
			<button className={css.btn} onClick={handleClick}>
				Reset
			</button>
		</header>
	)
}