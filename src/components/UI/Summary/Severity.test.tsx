import { render } from '@testing-library/react'
import Severity from './Severity'
import { ISeverity } from '../../../model/severity'

describe('Severity component', () => {
	test('renders severity component with correct data', () => {
		const { getByText } = render(<Severity severity={ISeverity.Low} />)

		expect(getByText('Severity:')).toBeInTheDocument()
		expect(getByText('Low')).toBeInTheDocument()
	})

	test('renders severity component with unknown data', () => {
		const { getByText } = render(<Severity severity={ISeverity.Unknown} />)

		expect(getByText('Severity:')).toBeInTheDocument()
		expect(getByText('Unknown')).toBeInTheDocument()
	})

	test('renders severity component with critical data', () => {
		const { getByText } = render(<Severity severity={ISeverity.Critical} />)

		expect(getByText('Severity:')).toBeInTheDocument()
		expect(getByText('Critical')).toBeInTheDocument()
	})
})
