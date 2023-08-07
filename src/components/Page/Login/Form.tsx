import { eventManagerContext } from '../../../store/eventContext'
import css from './Form.module.css'
import { ChangeEvent, useState, useContext } from 'react'
import { ISendLoginEventData, LoginConnectionType } from '../../../model/login'
import { Password } from './Password'
import { AccessToken } from './AccessToken'
import { Sso } from './Sso'
import { Footer } from './Footer'
import { Url } from './Url'

export function Form(): JSX.Element {
	const ctx = useContext(eventManagerContext)
	const [showPassword, setShowPassword] = useState<boolean>(false)
	const [advancedUrl, setAdvancedUrl] = useState<boolean>(false)
	const [loginData, setLoginData] = useState<ISendLoginEventData>({
		url: '',
		loginConnectionType: LoginConnectionType.BasicAuthOrToken,
		username: '',
		password: '',
		accessToken: ''
	})
	const [inputError, setInputError] = useState(false)

	const inputChangeHandler =
		(field: keyof ISendLoginEventData) =>
		(event: ChangeEvent<HTMLInputElement>): void => {
			setLoginData(prevState => ({
				...prevState,
				[field]: event.target.value
			}))
			setInputError(false)
		}

	const urlHandler = inputChangeHandler('url')
	const artifactoryUrlHandler = inputChangeHandler('artifactoryUrl')
	const xrayUrlHandler = inputChangeHandler('xrayUrl')
	const usernameHandler = inputChangeHandler('username')
	const passwordHandler = inputChangeHandler('password')
	const accessTokenHandler = inputChangeHandler('accessToken')

	const connectionTypeHandler = (loginConnectionType: LoginConnectionType): void => {
		setLoginData((prev: ISendLoginEventData) => ({
			...prev,
			loginConnectionType: loginConnectionType
		}))
	}

	const handleSighIn = (): void => {
		if (!isLoginDataValid(loginData)) {
			setInputError(true)
		} else {
			ctx.login(loginData)
		}
	}

	const onAdvancedUrl = (): void => {
		setLoginData(prev => ({ ...prev, xrayUrl: '', artifactoryUrl: '' }))
		setAdvancedUrl(prev => !prev)
	}

	const switchToPassword = (): void => {
		setShowPassword(true)
		setLoginData(prev => ({ ...prev, accessToken: '' }))
	}

	const switchToAccessToken = (): void => {
		setShowPassword(false)
		setLoginData(prev => ({ ...prev, password: '' }))
	}

	let form = (
		<Password
			handleUsername={usernameHandler}
			handlePassword={passwordHandler}
			handleAccessTokenSwitch={switchToAccessToken}
			inputError={inputError}
		/>
	)
	let containerCss = css.containerPassword

	switch (loginData.loginConnectionType) {
		case LoginConnectionType.BasicAuthOrToken:
			if (!showPassword) {
				form = (
					<AccessToken
						handleAccessToken={accessTokenHandler}
						handlePasswordSwitch={switchToPassword}
						inputError={inputError}
					/>
				)
				containerCss = advancedUrl ? css.containerAdvancedUrl : css.containerAccessToken
			} else {
				containerCss = advancedUrl ? css.containerAdvancedUrlWithPass : css.containerPassword
			}

			break
		case LoginConnectionType.Sso:
			form = <Sso />
			containerCss = advancedUrl ? css.containerAdvancedUrlWitSso : css.containerSso
	}

	function isLoginDataValid(loginData: ISendLoginEventData): boolean {
		const { url, accessToken, username, password } = loginData
		return (
			url?.trim() !== '' &&
			(accessToken?.trim() !== '' ||
				(username?.trim() !== '' && password?.trim() !== '') ||
				loginData.loginConnectionType === LoginConnectionType.Sso)
		)
	}

	return (
		<div className={`${css.container} ${containerCss}`}>
			<Url
				inputError={inputError}
				showAdvancedUrl={advancedUrl}
				handleAdvancedUrl={onAdvancedUrl}
				handleUrl={urlHandler}
				handleArtifactoryUrl={artifactoryUrlHandler}
				handleXrayUrl={xrayUrlHandler}
			/>
			{form}
			<Footer
				handleConnectionType={connectionTypeHandler}
				handleSighIn={handleSighIn}
				type={loginData.loginConnectionType}
			/>
		</div>
	)
}
