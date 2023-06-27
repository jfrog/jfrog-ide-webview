import { ISendLoginEventData, LoginConnectionType, LoginProgressStatus } from './login'

describe('Login Enums', () => {
	test('should have correct values for LoginConnectionType', () => {
		expect(LoginConnectionType.BasicAuthOrToken).toBe('BASIC_AUTH_OR_TOKEN')
		expect(LoginConnectionType.Sso).toBe('SSO')
		expect(LoginConnectionType.Cli).toBe('CLI')
		expect(LoginConnectionType.EnvVars).toBe('ENV_VARS')
	})

	test('should have correct values for LoginProgressStatus', () => {
		expect(LoginProgressStatus.Initial).toBe('INITIAL')
		expect(LoginProgressStatus.AutoConnect).toBe('AUTO_CONNECT')
		expect(LoginProgressStatus.AutoConnectAccepted).toBe('AUTO_CONNECT_ACCEPTED')
		expect(LoginProgressStatus.Verifying).toBe('VERIFYING')
		expect(LoginProgressStatus.Success).toBe('SUCCESS')
		expect(LoginProgressStatus.Failed).toBe('FAILED')
		expect(LoginProgressStatus.FailedTimeout).toBe('FAILED_TIMEOUT')
		expect(LoginProgressStatus.FailedBadCredentials).toBe('FAILED_BAD_CREDENTIALS')
		expect(LoginProgressStatus.FailedServerNotFound).toBe('FAILED_SERVER_NOT_FOUND')
		expect(LoginProgressStatus.FailedServerNotSupported).toBe('FAILED_SERVER_NOT_SUPPORTED')
		expect(LoginProgressStatus.FailedSaveCredentials).toBe('FAILED_SAVE_CREDENTIALS')
	})
})

describe('ISendLoginEventData', () => {
	test('should have the required properties', () => {
		const eventData: ISendLoginEventData = {
			loginConnectionType: LoginConnectionType.BasicAuthOrToken
		}

		expect(eventData).toHaveProperty('loginConnectionType')
	})

	test('should allow optional properties', () => {
		const eventData: ISendLoginEventData = {
			loginConnectionType: LoginConnectionType.BasicAuthOrToken,
			url: 'https://example.com',
			username: 'username',
			password: 'password'
		}

		expect(eventData).toHaveProperty('url', 'https://example.com')
		expect(eventData).toHaveProperty('username', 'username')
		expect(eventData).toHaveProperty('password', 'password')
	})
})
