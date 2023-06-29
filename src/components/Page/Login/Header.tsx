import { JFrogIcon } from '../../UI/Icons/JfrogIcon'
import css from './Header.module.css'

export function Header(): JSX.Element {
	return (
		<>
			<JFrogIcon />
			<div className={css.welcome}>Welcome to JFrog</div>
			<div className={css.text}> We&apos;re excited to see you!</div>
		</>
	)
}
