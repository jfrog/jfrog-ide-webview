import { render } from '@testing-library/react'
import Status, { Props } from './Status'

describe('Status component', () => {
	const defaultProps: Props = {
		status: 'Active'
	}

	test('renders status component with correct data', () => {
		const { getByText } = render(<Status {...defaultProps} />)

		expect(getByText('Status:')).toBeInTheDocument()
		expect(getByText('Active')).toBeInTheDocument()
	})
})
