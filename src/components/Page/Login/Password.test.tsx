import { render, screen, fireEvent } from '@testing-library/react'
import { Password, Props } from './Password'

describe('Password component', () => {
	const mockProps: Props = {
		handleUsername: jest.fn(),
		handlePassword: jest.fn(),
		handleAccessTokenSwitch: jest.fn(),
		inputError: false
	}

	beforeEach(() => {
		render(<Password {...mockProps} />)
	})

	test('renders the Password component', () => {
		expect(screen.getByLabelText('Username')).toBeInTheDocument()
		expect(screen.getByLabelText('Password')).toBeInTheDocument()
		expect(screen.getByRole('button', { name: 'Using Access-Token?' })).toBeInTheDocument()
	})

	test('calls the handleUsername function when username input changes', () => {
		const usernameInput = screen.getByLabelText('Username')
		const event = {
			target: { value: 'testUsername' }
		} as React.ChangeEvent<HTMLInputElement>
		fireEvent.change(usernameInput, event)
		expect(mockProps.handleUsername).toHaveBeenCalledWith(
			expect.objectContaining({
				target: expect.objectContaining({ value: 'testUsername' })
			})
		)
	})

	test('calls the handlePassword function when password input changes', () => {
		const passwordInput = screen.getByLabelText('Password')
		const event = {
			target: { value: 'testPassword' }
		} as React.ChangeEvent<HTMLInputElement>
		fireEvent.change(passwordInput, event)
		expect(mockProps.handlePassword).toHaveBeenCalledWith(
			expect.objectContaining({
				target: expect.objectContaining({ value: 'testPassword' })
			})
		)
	})

	test('calls the handleAccessTokenSwitch function when access token button is clicked', () => {
		const accessTokenButton = screen.getByRole('button', { name: 'Using Access-Token?' })
		fireEvent.click(accessTokenButton)
		expect(mockProps.handleAccessTokenSwitch).toHaveBeenCalled()
	})
})
