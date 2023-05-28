import { render, screen } from '@testing-library/react'
import Abbreviation, { Props } from './Abbreviation'

describe('Abbreviation component', () => {
	const defaultProps: Props = {
		abbreviation: 'ABC'
	}

	test('renders abbreviation component with correct data', () => {
		const { getByText } = render(<Abbreviation {...defaultProps} />)

		const textElement = screen.getByText('Abbreviation', { exact: false })
		expect(textElement).toBeInTheDocument()
		expect(getByText('ABC')).toBeInTheDocument()
	})
})
