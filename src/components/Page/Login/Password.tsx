import css from './Form.module.css'
import { ChangeEvent } from 'react'

export interface Props {
	handleUsername: (event: ChangeEvent<HTMLInputElement>) => void
	handlePassword: (event: ChangeEvent<HTMLInputElement>) => void
	handleAccessTokenSwitch: () => void
	inputError: boolean
}

export function Password(props: Props): JSX.Element {
	return (
		<>
			<div className={css.credContainer}>
				<div>
					<label className={css.inputHeader}>Username</label>
				</div>
				<input
					className={`${css.input} ${props.inputError ? css.inputError : ''}`}
					id="search"
					type="text"
					onChange={props.handleUsername}
				/>
			</div>
			<div className={css.credContainer}>
				<div className={css.passBox}>
					<label className={css.inputHeader}>Password</label>
					<button className={css.switchBtn} onClick={props.handleAccessTokenSwitch}>
						Have Access-Token?
					</button>
				</div>

				<input
					className={`${css.input} ${props.inputError ? css.inputError : ''}`}
					id="search"
					type="password"
					onChange={props.handlePassword}
				/>
			</div>
		</>
	)
}
