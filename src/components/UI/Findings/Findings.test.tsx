import { render } from '@testing-library/react'
import Findings from './Findings'

describe('Findings component', () => {
	test('renders Findings component with collapse sections', () => {
		const mockData = {
			snippet: 'Some snippet text',
			meaning: 'Some meaning text',
			happen: 'Some happen text',
			do: 'Some do text'
		}

		const { getByText } = render(<Findings {...mockData} />)

		// Assert that all collapse sections are rendered
		expect(getByText('FINDING')).toBeInTheDocument()
		expect(getByText('What Does it mean?')).toBeInTheDocument()
		expect(getByText('What can happen?')).toBeInTheDocument()
		expect(getByText('What should I do?')).toBeInTheDocument()

		// Assert that the text content of each collapse section is correct
		expect(getByText(mockData.snippet)).toBeInTheDocument()
		expect(getByText(mockData.meaning)).toBeInTheDocument()
		expect(getByText(mockData.happen)).toBeInTheDocument()
		expect(getByText(mockData.do)).toBeInTheDocument()
	})

	test('renders Findings component without collapse sections', () => {
		const { container } = render(<Findings />)

		// Assert that no collapse sections are rendered
		expect(container.childElementCount).toEqual(0)
	})
})
