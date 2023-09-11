import { render, screen } from '@testing-library/react'
import { ISeverity } from '../../../model/severity'
import Header from './Header'
describe('Header component', () => {
	test('Renders vulnerability header', () => {
		// Arrange
		render(<Header text="Header" pageData={{ severity: ISeverity.Critical }} />)
		// Assert
		const headerElement = screen.getByText('Header')
		expect(headerElement).toBeInTheDocument()
	})

	test('Renders vulnerability header with no isResearch', () => {
		// Arrange
		render(<Header text="Header" pageData={{ severity: ISeverity.Low }} />)
		// Assert
		const headerElement = screen.getByText('Header')
		expect(headerElement).toBeInTheDocument()
	})
})
