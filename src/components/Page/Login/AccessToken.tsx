import css from './Form.module.css'
import { ChangeEvent } from 'react'

export interface Props {
	handleAccessToken: (event: ChangeEvent<HTMLInputElement>) => void
	handlePasswordSwitch: () => void
	inputError: boolean
}

export function AccessToken(props: Props): JSX.Element {
	return (
		<div className={css.credContainer}>
			<div className={css.passBox}>
				<label className={css.inputHeader}>Access Token</label>
				<button className={css.switchBtn} onClick={props.handlePasswordSwitch}>
					Have Password?
				</button>
			</div>
			<input
				className={`${css.input} ${props.inputError ? css.inputError : ''}`}
				id="search"
				type="password"
				onChange={props.handleAccessToken}
			/>
		</div>
	)
}
