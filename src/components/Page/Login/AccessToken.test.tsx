import { render, fireEvent } from '@testing-library/react'
import { AccessToken, Props } from './AccessToken'

describe('AccessToken component', () => {
	const mockHandleAccessToken = jest.fn()
	const mockHandlePasswordSwitch = jest.fn()

	const defaultProps: Props = {
		handleAccessToken: mockHandleAccessToken,
		handlePasswordSwitch: mockHandlePasswordSwitch,
		inputError: false
	}

	test('renders without errors', () => {
		render(<AccessToken {...defaultProps} />)
	})

	test('calls handleAccessToken on input change', () => {
		const { getByLabelText } = render(<AccessToken {...defaultProps} />)
		const inputElement = getByLabelText('Access Token')

		fireEvent.change(inputElement, { target: { value: 'example-token' } })

		expect(mockHandleAccessToken).toHaveBeenCalledTimes(1)
		expect(mockHandleAccessToken).toHaveBeenCalledWith(expect.any(Object))
	})

	test('calls handlePasswordSwitch on button click', () => {
		const { getByText } = render(<AccessToken {...defaultProps} />)
		const buttonElement = getByText('Using Basic-Auth?')

		fireEvent.click(buttonElement)

		expect(mockHandlePasswordSwitch).toHaveBeenCalledTimes(1)
	})

	test('applies inputError class when inputError prop is true', () => {
		const { container } = render(<AccessToken {...defaultProps} inputError />)
		const inputElement = container.querySelector('input')

		expect(inputElement).toHaveClass('inputError')
	})
})
