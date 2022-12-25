import { render, screen } from '@testing-library/react'
import { ISeverity } from '../../../model/severity'
import Header from './Header'
describe('Header component', () => {
	test('renders vulnerability header', () => {
		// Arrange
		render(<Header text="Header" isResearch Severity={ISeverity.Critical}/>)
		// Assert
		const headerElement = screen.getByText('Header')
		expect(headerElement).toBeInTheDocument()
	})
})