import { render, screen } from '@testing-library/react'
import Reference from './Reference'
import { IReference } from '../../../../../model/reference'

describe('Reference component', () => {
	const mockData: IReference[] = [
		{
			text: 'Reference 1',
			url: 'https://example.com/reference1'
		},
		{
			url: 'https://example.com/reference2'
		}
	]

	test('renders the component with correct references', () => {
		render(<Reference data={mockData} />)

		mockData.forEach(ref => {
			if (ref.text) {
				const referenceTextElement = screen.getByText(ref.text)
				expect(referenceTextElement).toBeInTheDocument()
			}

			const referenceUrlElement = screen.getByText(ref.url)
			expect(referenceUrlElement).toBeInTheDocument()
		})
	})
})
