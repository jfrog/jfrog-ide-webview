import { render, fireEvent, waitFor } from '@testing-library/react'
import { LoginModal } from './LoginModal'
import { ILoginPage, LoginProgressStatus, LoginConnectionType, PageType } from '../../../../model'
import { eventManagerContext } from '../../../../store/eventContext'
import { TestEventManager } from '../../../../utils/testUtils'
import { WebviewSendEventType } from '../../../../api'
import { SendLoginEvent } from '../../../../api/sendEvent/login'

describe('LoginModal component', () => {
	const mockOnClose = jest.fn()

	let overlayElement: HTMLElement | null

	beforeEach(() => {
		overlayElement = document.createElement('div')
		overlayElement.setAttribute('id', 'overlay')
		document.body.appendChild(overlayElement)
	})

	afterEach(() => {
		overlayElement?.remove()
		overlayElement = null

		jest.restoreAllMocks()
		jest.clearAllMocks()
	})

	describe('JFrog CLI', () => {
		const mockLoginData: ILoginPage = {
			status: LoginProgressStatus.Verifying,
			connectionType: LoginConnectionType.Cli,
			url: 'example.com',
			pageType: PageType.Login
		}

		test('renders the login modal correctly', async () => {
			const { getByText } = render(<LoginModal onClose={mockOnClose} loginData={mockLoginData} />)
			await waitFor(() => {
				expect(
					getByText('You have a predefined JFrog CLI. Would you like to sign-in to')
				).toBeInTheDocument()
				expect(getByText('example.com')).toBeInTheDocument()
				expect(getByText('Verifying...')).toBeInTheDocument()
				expect(document.querySelector('.closeBtn')).toBeInTheDocument()
				expect(document.querySelector('.text')).toBeInTheDocument()
				expect(document.querySelector('.welcome')).toBeInTheDocument()
				expect(document.querySelector('.autoConnectBtn')).not.toBeInTheDocument()
			})
		})

		test('calls onClose function when the close button is clicked', async () => {
			render(<LoginModal onClose={mockOnClose} loginData={mockLoginData} />)
			await waitFor(() => {
				const closeButton = document.querySelector('.closeBtn')
				expect(closeButton).toBeInTheDocument()

				if (closeButton) {
					fireEvent.click(closeButton)
				}

				expect(mockOnClose).toHaveBeenCalledTimes(1)
			})
		})

		test('calls eventManager Login function when the auto connect button is clicked', async () => {
			const mockLogin = jest.fn()
			const mockEventManager = new TestEventManager(mockLogin, mockLogin)
			const mockLoginDataWithAutoConnect: ILoginPage = {
				...mockLoginData,
				status: LoginProgressStatus.AutoConnect
			}
			render(
				<eventManagerContext.Provider value={mockEventManager}>
					<LoginModal onClose={mockOnClose} loginData={mockLoginDataWithAutoConnect} />
				</eventManagerContext.Provider>
			)

			await waitFor(() => {
				const autoConnectButton = document.querySelector('.autoConnectBtn')
				expect(autoConnectButton).toBeInTheDocument()

				if (autoConnectButton) {
					fireEvent.click(autoConnectButton)
				}

				expect(mockLogin).toHaveBeenCalledWith({
					type: WebviewSendEventType.Login,
					data: { loginConnectionType: LoginConnectionType.Cli }
				} as SendLoginEvent)
			})
		})
	})
	describe('Env Vars', () => {
		const mockLoginData: ILoginPage = {
			status: LoginProgressStatus.Verifying,
			connectionType: LoginConnectionType.EnvVars,
			url: 'example.com',
			pageType: PageType.Login
		}

		test('renders the login modal correctly', async () => {
			const { getByText } = render(<LoginModal onClose={mockOnClose} loginData={mockLoginData} />)
			await waitFor(() => {
				expect(
					getByText('You have a predefined Environment Variable. Would you like to sign-in to')
				).toBeInTheDocument()
				expect(getByText('example.com')).toBeInTheDocument()
				expect(getByText('Verifying...')).toBeInTheDocument()
				expect(document.querySelector('.closeBtn')).toBeInTheDocument()
				expect(document.querySelector('.text')).toBeInTheDocument()
				expect(document.querySelector('.welcome')).toBeInTheDocument()
				expect(document.querySelector('.autoConnectBtn')).not.toBeInTheDocument()
			})
		})

		test('calls eventManager Login function when the auto connect button is clicked', async () => {
			const mockLogin = jest.fn()
			const mockEventManager = new TestEventManager(mockLogin, mockLogin)
			const mockLoginDataWithAutoConnect: ILoginPage = {
				...mockLoginData,
				status: LoginProgressStatus.AutoConnect
			}
			render(
				<eventManagerContext.Provider value={mockEventManager}>
					<LoginModal onClose={mockOnClose} loginData={mockLoginDataWithAutoConnect} />
				</eventManagerContext.Provider>
			)

			await waitFor(() => {
				const autoConnectButton = document.querySelector('.autoConnectBtn')
				expect(autoConnectButton).toBeInTheDocument()

				if (autoConnectButton) {
					fireEvent.click(autoConnectButton)
				}

				expect(mockLogin).toHaveBeenCalledWith({
					type: WebviewSendEventType.Login,
					data: { loginConnectionType: LoginConnectionType.EnvVars }
				} as SendLoginEvent)
			})
		})
	})

	describe('Default', () => {
		const mockLoginData: ILoginPage = {
			status: LoginProgressStatus.Verifying,
			connectionType: LoginConnectionType.Default,
			url: 'example.com',
			pageType: PageType.Login
		}

		test('renders the login modal correctly', async () => {
			const { getByText, queryByText } = render(
				<LoginModal onClose={mockOnClose} loginData={mockLoginData} />
			)
			await waitFor(() => {
				expect(
					queryByText('You have a predefined Environment Variable. Would you like to sign-in to')
				).not.toBeInTheDocument()
				expect(queryByText('example.com')).not.toBeInTheDocument()
				expect(getByText('Verifying...')).toBeInTheDocument()
				expect(document.querySelector('.closeBtn')).toBeInTheDocument()
				expect(document.querySelector('.text')).toBeInTheDocument()
				expect(document.querySelector('.welcome')).toBeInTheDocument()
				expect(document.querySelector('.autoConnectBtn')).not.toBeInTheDocument()
			})
		})

		test('calls eventManager Login function when the auto connect button is clicked', async () => {
			const mockLogin = jest.fn()
			const mockEventManager = new TestEventManager(mockLogin, mockLogin)
			const mockLoginDataWithAutoConnect: ILoginPage = {
				...mockLoginData,
				status: LoginProgressStatus.AutoConnect
			}
			render(
				<eventManagerContext.Provider value={mockEventManager}>
					<LoginModal onClose={mockOnClose} loginData={mockLoginDataWithAutoConnect} />
				</eventManagerContext.Provider>
			)

			await waitFor(() => {
				const autoConnectButton = document.querySelector('.autoConnectBtn')
				expect(autoConnectButton).toBeInTheDocument()

				if (autoConnectButton) {
					fireEvent.click(autoConnectButton)
				}

				expect(mockLogin).toHaveBeenCalledWith({
					type: WebviewSendEventType.Login,
					data: { loginConnectionType: LoginConnectionType.Default }
				} as SendLoginEvent)
			})
		})
	})
	describe('Sso', () => {
		const mockLoginData: ILoginPage = {
			status: LoginProgressStatus.Verifying,
			connectionType: LoginConnectionType.Sso,
			url: 'example.com',
			pageType: PageType.Login
		}

		test('renders the login modal correctly', async () => {
			const { getByText, queryByText } = render(
				<LoginModal onClose={mockOnClose} loginData={mockLoginData} />
			)
			await waitFor(() => {
				expect(
					queryByText('You have a predefined Environment Variable. Would you like to sign-in to')
				).not.toBeInTheDocument()
				expect(getByText('Almost there!')).toBeInTheDocument()
				expect(getByText('Waiting for you to sign in...')).toBeInTheDocument()
				expect(document.querySelector('.closeBtn')).toBeInTheDocument()
				expect(document.querySelector('.text')).toBeInTheDocument()
				expect(document.querySelector('.welcome')).toBeInTheDocument()
				expect(document.querySelector('.autoConnectBtn')).not.toBeInTheDocument()
			})
		})

		test('calls eventManager Login function when the auto connect button is clicked', async () => {
			const mockLogin = jest.fn()
			const mockEventManager = new TestEventManager(mockLogin, mockLogin)
			const mockLoginDataWithAutoConnect: ILoginPage = {
				...mockLoginData,
				status: LoginProgressStatus.AutoConnect
			}
			render(
				<eventManagerContext.Provider value={mockEventManager}>
					<LoginModal onClose={mockOnClose} loginData={mockLoginDataWithAutoConnect} />
				</eventManagerContext.Provider>
			)

			await waitFor(() => {
				const autoConnectButton = document.querySelector('.autoConnectBtn')
				expect(autoConnectButton).toBeInTheDocument()

				if (autoConnectButton) {
					fireEvent.click(autoConnectButton)
				}

				expect(mockLogin).toHaveBeenCalledWith({
					type: WebviewSendEventType.Login,
					data: { loginConnectionType: LoginConnectionType.Sso }
				} as SendLoginEvent)
			})
		})

		test('should render fail to sign in', async () => {
			const mockLogin = jest.fn()
			const mockEventManager = new TestEventManager(mockLogin, mockLogin)
			const mockLoginDataWithAutoConnect: ILoginPage = {
				...mockLoginData,
				status: LoginProgressStatus.Failed
			}
			const { getByText } = render(
				<eventManagerContext.Provider value={mockEventManager}>
					<LoginModal onClose={mockOnClose} loginData={mockLoginDataWithAutoConnect} />
				</eventManagerContext.Provider>
			)

			await waitFor(() => {
				expect(getByText('Connection could not be established.')).toBeInTheDocument()
			})
		})
		test('should render FailedBadCredentials', async () => {
			const mockLogin = jest.fn()
			const mockEventManager = new TestEventManager(mockLogin, mockLogin)
			const mockLoginDataWithAutoConnect: ILoginPage = {
				...mockLoginData,
				status: LoginProgressStatus.FailedBadCredentials
			}
			const { getByText } = render(
				<eventManagerContext.Provider value={mockEventManager}>
					<LoginModal onClose={mockOnClose} loginData={mockLoginDataWithAutoConnect} />
				</eventManagerContext.Provider>
			)

			await waitFor(() => {
				expect(getByText('Invalid credentials.')).toBeInTheDocument()
			})
		})
		test('should render FailedTimeout', async () => {
			const mockLogin = jest.fn()
			const mockEventManager = new TestEventManager(mockLogin, mockLogin)
			const mockLoginDataWithAutoConnect: ILoginPage = {
				...mockLoginData,
				status: LoginProgressStatus.FailedTimeout
			}
			const { getByText } = render(
				<eventManagerContext.Provider value={mockEventManager}>
					<LoginModal onClose={mockOnClose} loginData={mockLoginDataWithAutoConnect} />
				</eventManagerContext.Provider>
			)

			await waitFor(() => {
				expect(getByText('A timeout occurred. Please try again.')).toBeInTheDocument()
			})
		})
		test('should render FailedServerNotFound', async () => {
			const mockLogin = jest.fn()
			const mockEventManager = new TestEventManager(mockLogin, mockLogin)
			const mockLoginDataWithAutoConnect: ILoginPage = {
				...mockLoginData,
				status: LoginProgressStatus.FailedServerNotFound
			}
			const { getByText } = render(
				<eventManagerContext.Provider value={mockEventManager}>
					<LoginModal onClose={mockOnClose} loginData={mockLoginDataWithAutoConnect} />
				</eventManagerContext.Provider>
			)

			await waitFor(() => {
				expect(getByText('Server not found.')).toBeInTheDocument()
			})
		})
		test('should render FailedServerNotSupported', async () => {
			const mockLogin = jest.fn()
			const mockEventManager = new TestEventManager(mockLogin, mockLogin)
			const mockLoginDataWithAutoConnect: ILoginPage = {
				...mockLoginData,
				status: LoginProgressStatus.FailedServerNotSupported
			}
			const { getByText } = render(
				<eventManagerContext.Provider value={mockEventManager}>
					<LoginModal onClose={mockOnClose} loginData={mockLoginDataWithAutoConnect} />
				</eventManagerContext.Provider>
			)

			await waitFor(() => {
				expect(getByText('The server is not compatible with SSO login.')).toBeInTheDocument()
			})
		})
		test('should render FailedServerNotFound', async () => {
			const mockLogin = jest.fn()
			const mockEventManager = new TestEventManager(mockLogin, mockLogin)
			const mockLoginDataWithAutoConnect: ILoginPage = {
				...mockLoginData,
				status: LoginProgressStatus.Success
			}
			const { getByText } = render(
				<eventManagerContext.Provider value={mockEventManager}>
					<LoginModal onClose={mockOnClose} loginData={mockLoginDataWithAutoConnect} />
				</eventManagerContext.Provider>
			)

			await waitFor(() => {
				expect(
					getByText('Your credentials will be securely stored on the machine for future use.')
				).toBeInTheDocument()
			})
		})
	})
})
