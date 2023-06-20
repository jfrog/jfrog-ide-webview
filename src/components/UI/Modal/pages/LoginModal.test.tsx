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
})
