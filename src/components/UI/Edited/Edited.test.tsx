import { render, screen } from '@testing-library/react'
import Edited from './Edited'
describe('Edited component', () => {
	test('Renders last time edited', () => {
		// Arrange
		render(<Edited date="2022-10-26T09:40:18Z" />)
		// Assert
		const titleElement = screen.getByText('Wed, 26 Oct 2022 09:40:18 GMT', { exact: false })
		expect(titleElement).toBeInTheDocument()
	})
})
