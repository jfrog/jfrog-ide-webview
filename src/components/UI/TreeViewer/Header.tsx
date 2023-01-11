import Filter from './Filter'
import css from './Header.module.css'
export interface Props {
  filter: string
  OnFilter: (filter: string) => void
  OnActiveNode: (node: string) => void
}

export default function Header(props: Props) {
	const handleClick = () => {
		props.OnActiveNode('')
		props.OnFilter('')
	}

	return (
		<header className={css.container}>
			<Filter filter={props.filter} setFilter={props.OnFilter}/>
			<button className={css.btn} onClick={handleClick}>
				Reset
			</button>
		</header>
	)
}