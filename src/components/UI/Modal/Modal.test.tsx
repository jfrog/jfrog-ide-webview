import { render, waitFor, fireEvent } from '@testing-library/react'
import { Modal } from './Modal'

describe('Modal component', () => {
	const mockChildren = <div>Modal content</div>
	const mockOnClose = jest.fn()
	let overlayElement: HTMLElement | null

	beforeEach(() => {
		overlayElement = document.createElement('div')
		overlayElement.setAttribute('id', 'overlay')
		document.body.appendChild(overlayElement)
	})

	afterEach(() => {
		overlayElement?.remove()
		overlayElement = null
		jest.restoreAllMocks()
	})

	test('renders the backdrop and modal overlay', async () => {
		const { getByText } = render(<Modal onClose={mockOnClose}>{mockChildren}</Modal>)
		await waitFor(() => {
			expect(getByText('Modal content')).toBeInTheDocument()
			expect(document.querySelector('.backdrop')).toBeInTheDocument()
			expect(document.querySelector('.modal')).toBeInTheDocument()
		})
	})

	test('calls onClose function when backdrop is clicked', async () => {
		render(<Modal onClose={mockOnClose}>{mockChildren}</Modal>)

		await waitFor(() => {
			const backdropElement = document.querySelector('.backdrop')
			expect(backdropElement).toBeInTheDocument()

			if (backdropElement) {
				fireEvent.click(backdropElement)
			}

			expect(mockOnClose).toHaveBeenCalledTimes(1)
		})
	})
})
