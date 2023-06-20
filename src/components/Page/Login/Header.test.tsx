import { render } from '@testing-library/react'
import { Header } from './Header'

describe('Header component', () => {
	it('renders the header with the JFrogIcon and welcome text', () => {
		const { getByText, getByTestId } = render(<Header />)
		const jfrogIcon = getByTestId('jfrog-icon')
		const welcomeText = getByText('Welcome to JFrog')
		expect(jfrogIcon).toBeInTheDocument()
		expect(welcomeText).toBeInTheDocument()
	})

	it('renders the header with the text "We\'re excited to see you!"', () => {
		const { getByText } = render(<Header />)
		const excitedText = getByText("We're excited to see you!")
		expect(excitedText).toBeInTheDocument()
	})
})
