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
					<label htmlFor="input-u" className={css.inputHeader}>
						Username
					</label>
				</div>
				<input
					id="input-u"
					className={`${css.input} ${props.inputError ? css.inputError : ''}`}
					type="text"
					onChange={props.handleUsername}
				/>
			</div>
			<div className={css.credContainer}>
				<div className={css.passBox}>
					<label htmlFor="input-p" className={css.inputHeader}>
						Password
					</label>
					<button className={css.switchBtn} onClick={props.handleAccessTokenSwitch}>
						Using Access-Token?
					</button>
				</div>

				<input
					id="input-p"
					className={`${css.input} ${props.inputError ? css.inputError : ''}`}
					type="password"
					onChange={props.handlePassword}
				/>
			</div>
		</>
	)
}
