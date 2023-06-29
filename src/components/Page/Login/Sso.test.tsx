import { render, screen } from '@testing-library/react'
import { Sso } from './Sso'

describe('Sso', () => {
	beforeEach(() => {
		render(<Sso />)
	})

	test('renders the SSO component', () => {
		const ssoElement = screen.getByText(
			'To proceed with authentication, you will be redirected to the SSO login page.'
		)
		expect(ssoElement).toBeInTheDocument()
	})

	test('renders the required Artifactory version paragraph', () => {
		const versionElement = screen.getByText('Requires Artifactory version 7.63.1 or higher')
		expect(versionElement).toBeInTheDocument()
	})

	test('renders the red star in the required Artifactory version paragraph', () => {
		const starElement = screen.getByText('*')
		expect(starElement).toBeInTheDocument()
		expect(starElement).toHaveClass('redStar')
	})
})
