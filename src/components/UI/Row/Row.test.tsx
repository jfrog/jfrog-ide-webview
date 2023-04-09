import { render, screen } from '@testing-library/react'
import Row from './Row'
describe('Row component', () => {
	test('Renders a row with title and text', () => {
		const title = 'row-title'
		const text = 'row-text'
		// Arrange
		render(<Row title={title} data={text}/>)
		// Assert
		const titleElement = screen.getByText(`${title}`, { exact: false })
		expect(titleElement).toBeInTheDocument()
		const textElement = screen.getByText(`${text}`, { exact: false })
		expect(textElement).toBeInTheDocument()
	})
})