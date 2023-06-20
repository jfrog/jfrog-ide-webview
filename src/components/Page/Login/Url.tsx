import css from './Form.module.css'
import { ChangeEvent } from 'react'
import { BlueArrowIcon } from '../../UI/Icons/BlueArrowIcon'

export interface Props {
	inputError: boolean
	showAdvancedUrl: boolean
	handleAdvancedUrl: () => void
	handleUrl: (event: ChangeEvent<HTMLInputElement>) => void
	handleArtifactoryUrl: (event: ChangeEvent<HTMLInputElement>) => void
	handleXrayUrl: (event: ChangeEvent<HTMLInputElement>) => void
}

export function Url(props: Props): JSX.Element {
	return (
		<>
			<div className={css.credContainer}>
				<div className={css.passBox}>
					<label htmlFor="input-u" className={css.inputHeader}>
						Platform URL
					</label>
					<button className={css.switchBtn} onClick={props.handleAdvancedUrl}>
						Advanced
						<BlueArrowIcon
							className={props.showAdvancedUrl ? css.advanceUrlArrowOpen : css.advanceUrlArrowClose}
						/>
					</button>
				</div>
				<input
					id="input-u"
					className={`${css.input} ${props.inputError ? css.inputError : ''}`}
					type="text"
					onChange={props.handleUrl}
				/>
			</div>
			{props.showAdvancedUrl && (
				<>
					<div className={css.credContainer}>
						<div>
							<label htmlFor="input-au" className={css.inputHeader}>
								Artifactory URL
							</label>
						</div>
						<input
							id="input-au"
							className={`${css.input} ${props.inputError ? css.inputError : ''}`}
							type="text"
							onChange={props.handleArtifactoryUrl}
						/>
					</div>
					<div className={css.credContainer}>
						<div>
							<label htmlFor="input-xu" className={css.inputHeader}>
								Xray URL
							</label>
						</div>
						<input
							id="input-xu"
							className={`${css.input} ${props.inputError ? css.inputError : ''}`}
							type="text"
							onChange={props.handleXrayUrl}
						/>
					</div>
				</>
			)}
		</>
	)
}
