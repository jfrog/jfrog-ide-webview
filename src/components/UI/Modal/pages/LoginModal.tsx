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
import CopyButton from '../../CopyButton/CopyButton'
import TimeoutProgress from '../../Progress/TimeoutProgress'

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
		case LoginProgressStatus.AutoConnect:
			pageBody = getAutoConnectBody(data)
			break
		case LoginProgressStatus.Verifying:
			pageBody = getVerifyingBody(data)
			break
	}

	return <div className={css.text}>{pageBody}</div>
}

function getAutoConnectBody(data: ILoginPage): JSX.Element {
	switch (data.connectionType) {
		case LoginConnectionType.Cli:
			return (
				<div className={css.autoLoginText}>
					<span> It looks like JFrog CLI is installed with the connection details of</span>
					<div>
						<span className={css.textBold}>{data.url}</span>
					</div>
					<div />
					<span>Would you like to use this configuration?</span>
				</div>
			)
		case LoginConnectionType.EnvVars:
			return (
				<div className={css.autoLoginText}>
					<span>Environment variables are set with the connection details of</span>
					<div>
						<span className={css.textBold}>{data.url}</span>
					</div>
					<div />
					<span>Would you like to use this configuration?</span>
				</div>
			)
	}

	return <> </>
}

function getVerifyingBody(data: ILoginPage): JSX.Element {
	if (data.connectionType === LoginConnectionType.Sso) {
		if (data.ssoVerification) {
			return (
				<div>
					<div className={css.codeContainer}>
						<div className={css.codeBody}>Verification Code</div>
						<div className={css.codeBody}>
							<div>{data.ssoVerification.code}</div>
							<div>
								<CopyButton copyText={data.ssoVerification.code} />
							</div>
						</div>
						<TimeoutProgress timeoutMs={data.ssoVerification.codeTimeoutMs} />
					</div>
					Upon logging in through your browser, you might receive a prompt to enter the verification code above.
				</div>
			)
		}

		return <div>Please go ahead and complete the login process in the opened browser</div>
	}

	return <> </>
}

function createTitle(data: ILoginPage): JSX.Element {
	let title = ''

	switch (data.status) {
		case LoginProgressStatus.Failed:
		case LoginProgressStatus.FailedBadCredentials:
		case LoginProgressStatus.FailedTimeout:
		case LoginProgressStatus.FailedServerNotFound:
			title = 'Sign in failed'
			break
		case LoginProgressStatus.Success:
			title = "You're in!"
			break
		case LoginProgressStatus.AutoConnect:
			title =
				data.connectionType === LoginConnectionType.Cli
					? 'Sign In Using JFrog CLI'
					: 'Sign In Using Env-Var'
			break
		case LoginProgressStatus.Verifying:
			title = data.connectionType === LoginConnectionType.Sso ? '' : 'Verifying...'
	}

	return <div className={css.welcome}>{title}</div>
}
