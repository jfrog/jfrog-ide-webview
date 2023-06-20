import { render, fireEvent } from '@testing-library/react'
import { Form } from './Form'
import { eventManagerContext } from '../../../store/eventContext'
import { TestEventManager } from '../../../utils/testUtils'

describe('Form component', () => {
	const mockLogin = jest.fn()
	const mockEventManager = new TestEventManager(mockLogin, mockLogin)

	test('renders the form with the default access token input', () => {
		const { getByLabelText, getByText } = render(
			<eventManagerContext.Provider value={mockEventManager}>
				<Form />
			</eventManagerContext.Provider>
		)
		const accessTokenInput = getByLabelText('Access Token')
		const signInButton = getByText('Sign in')
		expect(accessTokenInput).toBeInTheDocument()
		expect(signInButton).toBeInTheDocument()
	})

	test('calls handleAccessTokenSwitch when "Have Password?" button is clicked', () => {
		const { getByText } = render(
			<eventManagerContext.Provider value={mockEventManager}>
				<Form />
			</eventManagerContext.Provider>
		)
		const switchButton = getByText('Have Password?')
		expect(switchButton).toBeInTheDocument()
	})

	test('renders the form with the default password input', () => {
		const { getByText } = render(
			<eventManagerContext.Provider value={mockEventManager}>
				<Form />
			</eventManagerContext.Provider>
		)
		const passwordButton = getByText('Have Password?')
		fireEvent.click(passwordButton)
		expect(getByText('Username')).toBeInTheDocument()
		expect(getByText('Password')).toBeInTheDocument()
		expect(getByText('Sign in')).toBeInTheDocument()
	})

	test('calls accessTokenHandler when access token inputs change', () => {
		const { getByLabelText } = render(
			<eventManagerContext.Provider value={mockEventManager}>
				<Form />
			</eventManagerContext.Provider>
		)
		const accessTokenInput = getByLabelText('Access Token') as HTMLInputElement
		fireEvent.change(accessTokenInput, { target: { value: 'accessToken!' } })
		expect(accessTokenInput.value).toBe('accessToken!')
	})

	test('calls handleUsername and handlePassword when username and password inputs change', () => {
		const { getByText, getByLabelText } = render(
			<eventManagerContext.Provider value={mockEventManager}>
				<Form />
			</eventManagerContext.Provider>
		)
		const passwordButton = getByText('Have Password?')
		fireEvent.click(passwordButton)
		const usernameInput = getByLabelText('Username') as HTMLInputElement
		const passwordInput = getByLabelText('Password') as HTMLInputElement
		fireEvent.change(usernameInput, { target: { value: 'testUser' } })
		fireEvent.change(passwordInput, { target: { value: 'testPassword' } })
		expect(usernameInput.value).toBe('testUser')
		expect(passwordInput.value).toBe('testPassword')
	})

	test('no calls Login when "Sign in" button is clicked with not valid login data', () => {
		const { getByText } = render(
			<eventManagerContext.Provider value={mockEventManager}>
				<Form />
			</eventManagerContext.Provider>
		)
		const signInButton = getByText('Sign in')
		fireEvent.click(signInButton)
		expect(mockLogin).toHaveBeenCalledTimes(0)
	})

	test('calls Login when "Sign in" button is clicked with valid login data', () => {
		const { getByText, getByLabelText } = render(
			<eventManagerContext.Provider value={mockEventManager}>
				<Form />
			</eventManagerContext.Provider>
		)
		const accessTokenInput = getByLabelText('Access Token') as HTMLInputElement
		fireEvent.change(accessTokenInput, { target: { value: 'accessToken!' } })
		const urlInput = getByLabelText('Platform URL') as HTMLInputElement
		fireEvent.change(urlInput, { target: { value: 'url!' } })
		const signInButton = getByText('Sign in')
		fireEvent.click(signInButton)
		expect(mockLogin).toHaveBeenCalledTimes(1)
	})

	test('renders the form with the SSO component when connection type is SSO', () => {
		const { getByText } = render(
			<eventManagerContext.Provider value={mockEventManager}>
				<Form />
			</eventManagerContext.Provider>
		)
		const ssoButton = getByText('Continue With SSO')
		fireEvent.click(ssoButton)
		expect(getByText('Requires Artifactory version 7.57 or higher')).toBeInTheDocument()
	})
})
