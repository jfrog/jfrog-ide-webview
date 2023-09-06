import { render } from '@testing-library/react'
import { Collapse, Props } from './Collapse'

describe('Collapse component', () => {
	const mockData: Props = {
		header: 'Test Header',
		content: 'Test Content'
	}

	test('renders collapse header and content', () => {
		const { getByText } = render(<Collapse {...mockData} />)

		// Assert that the collapse header is rendered
		expect(getByText(mockData.header as string)).toBeInTheDocument()
	})
})
