import { render, screen } from '@testing-library/react'
import List from './List'

describe('List component', () => {
	test('Do not Render list items', () => {
		// Arrange
		const { container } = render(<List />)
		// Assert
		expect(container.firstElementChild?.childElementCount).toEqual(0)
	})

	test('Render List with one item', () => {
		// Arrange
		const { container } = render(
			<List>
				<label>label</label>
			</List>
		)
		// Assert
		expect(container.firstElementChild?.childElementCount).toEqual(1)
		const textElement = screen.getByText('label')
		expect(textElement).toBeInTheDocument()
	})

	test('Render list with two items', () => {
		// Arrange
		const { container } = render(
			<List>
				<label>label</label>
				<div>div</div>
			</List>
		)
		// Assert
		expect(container.firstElementChild?.childElementCount).toEqual(2)
		let textElement = screen.getByText('label')
		expect(textElement).toBeInTheDocument()
		textElement = screen.getByText('div')
		expect(textElement).toBeInTheDocument()
	})
})
