import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Summary from './Summary'

describe('Summary component', () => {
	test('renders Summary component without expand button', () => {
		const { getByText, queryByText } = render(
			<Summary expandButton={false}>
				<li>Item 1</li>
				<li>Item 2</li>
				<li>Item 3</li>
			</Summary>
		)

		expect(queryByText('Show More')).toBeNull()
		expect(getByText('Item 1')).toBeInTheDocument()
		expect(getByText('Item 2')).toBeInTheDocument()
		expect(getByText('Item 3')).toBeInTheDocument()
	})

	test('expands the summary when the expand button is clicked', async () => {
		const children = <li>Item 1</li>
		render(<Summary expandButton>{children}</Summary>)
		const expandButton = screen.getByText('Show More')
		const detailsElement = screen.getByText('Item 1')
		expect(detailsElement.parentElement).toHaveClass('halfText')
		fireEvent.click(expandButton)
		await waitFor(() => {
			expect(detailsElement.parentElement).toHaveClass('fullText')
		})
	})
})
