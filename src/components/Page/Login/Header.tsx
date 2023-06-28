import { JfrogIcon } from '../../UI/Icons/JfrogIcon'
import css from './Header.module.css'

export function Header(): JSX.Element {
	return (
		<>
			<JfrogIcon />
			<div className={css.welcome}>Welcome to JFrog</div>
			<div className={css.text}> We&apos;re excited to see you!</div>
		</>
	)
}
