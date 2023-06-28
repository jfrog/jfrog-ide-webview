import { EventManager } from '../../../../api/eventManager'
import {
	ILoginPage,
	LoginProgressStatus,
	LoginConnectionType,
	ISendLoginEventData
} from '../../../../model'
import { eventManagerContext } from '../../../../store/eventContext'
import { Spinner, State } from '../../Spinner/Spinner'
import { Modal } from '../Modal'
import css from './LoginModal.module.css'
import { useContext } from 'react'
import { XMark } from './../../Icons/XMark'

export interface Props {
	onClose: () => void
	loginData: ILoginPage
}

export function LoginModal(props: Props): JSX.Element {
	const ctx: EventManager = useContext(eventManagerContext)
	return (
		<Modal onClose={props.onClose}>
			<div className={css.container}>
				<div>
					<button className={css.closeBtn} onClick={props.onClose}>
						<XMark />
					</button>
				</div>
				<div>
					<Spinner state={createSpinnerState(props.loginData.status)} />
				</div>
				<div>
					{createTitle(props.loginData)}
					{createBody(props.loginData)}
					{props.loginData.status === LoginProgressStatus.AutoConnect && (
						<button
							className={css.autoConnectBtn}
							onClick={(): void => {
								ctx.login({
									loginConnectionType: props.loginData.connectionType
								} as ISendLoginEventData)
							}}
						>
							Sure!
						</button>
					)}
				</div>
			</div>
		</Modal>
	)
}

function createSpinnerState(s: LoginProgressStatus): State {
	switch (s) {
		case LoginProgressStatus.Success:
			return State.Success
		case LoginProgressStatus.AutoConnect:
			return State.AutoConnect
		case LoginProgressStatus.Failed:
		case LoginProgressStatus.FailedTimeout:
		case LoginProgressStatus.FailedServerNotFound:
		case LoginProgressStatus.FailedBadCredentials:
			return State.Fail
		default:
			return State.Loading
	}
}

function createBody(data: ILoginPage): JSX.Element {
	let pageBody = <> </>

	switch (data.connectionType) {
		case LoginConnectionType.Cli:
			pageBody = (
				<div>
					<span>We found a JFrog CLI with connection details for </span>
					<span className={css.textBold}>{data.url}</span>.
					<div/>
					<span>Would you like to use it for sigh in?</span>
				</div>
			)
			break
		case LoginConnectionType.EnvVars:
			pageBody = (
				<div>
					<span>We found environment variables with connection details for </span>
					<span className={css.textBold}>{data.url}</span>.
					<div/>
					<span>Would you like to use it for sigh in?</span>
				</div>
			)
			break
		case LoginConnectionType.Sso:
			pageBody = <div>Waiting for you to sign in...</div>
			break
	}

	switch (data.status) {
		case LoginProgressStatus.Failed:
			pageBody = <div>Connection could not be established.</div>
			break
		case LoginProgressStatus.FailedBadCredentials:
			pageBody = <div>Invalid credentials.</div>
			break
		case LoginProgressStatus.FailedTimeout:
			pageBody = <div>A connection timeout occurred. Please try again.</div>
			break
		case LoginProgressStatus.FailedServerNotFound:
			pageBody = <div>JFrog Platform instance not found.</div>
			break
		case LoginProgressStatus.FailedServerNotSupported:
			pageBody = <div>The JFrog Platform instance does not support SSO login from VS Code.</div>
			break
		case LoginProgressStatus.Success:
			pageBody = <div>Your credentials will be securely stored on the machine for future use.</div>
			break
	}

	return <div className={css.text}>{pageBody}</div>
}

function createTitle(data: ILoginPage): JSX.Element {
	let title = <> </>

	switch (data.status) {
		case LoginProgressStatus.Failed:
		case LoginProgressStatus.FailedBadCredentials:
		case LoginProgressStatus.FailedTimeout:
		case LoginProgressStatus.FailedServerNotFound:
			title = <span>Sign in failed</span>
			break
		case LoginProgressStatus.Success:
			title = <span>You&apos;re in!</span>
			break
		case LoginProgressStatus.AutoConnect:
			title = <span>Automatic Sign In</span>
			break
		case LoginProgressStatus.Verifying:
			title =
				data.connectionType === LoginConnectionType.Sso ? (
					<span>Almost there!</span>
				) : (
					<span>Verifying...</span>
				)
	}

	return <div className={css.welcome}>{title}</div>
}
