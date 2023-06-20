export enum LoginConnectionType {
	Default = 'DEFAULT',
	Sso = 'SSO',
	Cli = 'CLI',
	EnvVars = 'ENV_VARS'
}

export enum LoginProgressStatus {
	Initial = 'INITIAL',
	AutoConnect = 'AUTO_CONNECT',
	AutoConnectAccepted = 'AUTO_CONNECT_ACCEPTED',
	Verifying = 'VERIFYING',
	Success = 'SUCCESS',
	Failed = 'FAILED',
	FailedTimeout = 'FAILED_TIMEOUT',
	FailedBadCredentials = 'FAILED_BAD_CREDENTIALS',
	FailedServerNotFound = 'FAILED_SERVER_NOT_FOUND',
	FailedServerNotSupported = 'FAILED_SERVER_NOT_SUPPORTED',
	FailedSaveCredentials = 'FAILED_SAVE_CREDENTIALS'
}

export interface ISendLoginEventData {
	url?: string
	artifactoryUrl?: string
	xrayUrl?: string
	username?: string
	password?: string
	accessToken?: string
	loginConnectionType: LoginConnectionType
}
