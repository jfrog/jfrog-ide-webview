import { render, screen, fireEvent } from '@testing-library/react'
import Header, { Props } from './Header'

describe('Header', () => {
	const mockFilter = 'example'
	const mockOnFilter = jest.fn()
	const mockOnActiveNode = jest.fn()

	const props: Props = {
		filter: mockFilter,
		OnFilter: mockOnFilter,
		OnActiveNode: mockOnActiveNode
	}

	beforeEach(() => {
		render(<Header {...props} />)
	})

	test('renders the filter component with correct props', () => {
		const filterInput = screen.getByPlaceholderText('Filter nodes...')
		expect(filterInput).toBeInTheDocument()
		expect(filterInput).toHaveValue(mockFilter)
	})

	test('renders the reset button', () => {
		const resetButton = screen.getByRole('button', { name: 'Reset' })
		expect(resetButton).toBeInTheDocument()
		expect(resetButton).toHaveClass('btn')
	})

	test('calls OnActiveNode and OnFilter when reset button is clicked', () => {
		const resetButton = screen.getByRole('button', { name: 'Reset' })
		fireEvent.click(resetButton)
		expect(mockOnActiveNode).toHaveBeenCalledWith('')
		expect(mockOnFilter).toHaveBeenCalledWith('')
	})
})
