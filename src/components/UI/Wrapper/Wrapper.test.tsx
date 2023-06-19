import { render } from '@testing-library/react'
import Wrapper, { Props } from './Wrapper'

describe('Wrapper component', () => {
	const mockData: Props = {
		headline: 'Test Headline',
		children: <div>Test Content</div>
	}

	test('renders wrapper component with headline and content', () => {
		const { getByText } = render(<Wrapper {...mockData} />)

		// Assert that the headline is rendered
		expect(getByText('Test Headline')).toBeInTheDocument()

		// Assert that the content is rendered
		expect(getByText('Test Content')).toBeInTheDocument()

		// Assert that the line is rendered
		expect(document.querySelectorAll('.line')).toHaveLength(1)
	})

	test('renders wrapper component without headline', () => {
		const { container } = render(<Wrapper />)

		// Assert that no content is rendered
		expect(container.firstElementChild?.childElementCount).toEqual(0)

		// Assert that there is one line element
		expect(document.querySelectorAll('.line')).toHaveLength(1)
	})
})
