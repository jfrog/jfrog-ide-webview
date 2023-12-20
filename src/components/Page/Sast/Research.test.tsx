import { render } from '@testing-library/react'
import Research from './Research'

describe('Research component', () => {
	test('renders without description and remediation', () => {
		const { container } = render(<Research />)
		expect(container.firstChild).toBeNull()
	})

	test('renders with description', () => {
		const description = 'Example description'
		const { getByText, queryByText } = render(<Research description={description} />)
		const descriptionElement = getByText('DESCRIPTION')
		const textElement = getByText(description)
		expect(descriptionElement).toBeInTheDocument()
		expect(textElement).toBeInTheDocument()
		const remediationElement = queryByText('REMEDIATION')
		expect(remediationElement).toBeNull()
	})

	test('renders with remediation', () => {
		const remediation = ['Remediation 1', 'Remediation 2']
		const { getByText, queryByText } = render(<Research remediation={remediation} />)
		const remediationElement = getByText('REMEDIATION')
		const reasonElement1 = getByText('Remediation 1')
		const reasonElement2 = getByText('Remediation 2')
		expect(remediationElement).toBeInTheDocument()
		expect(reasonElement1).toBeInTheDocument()
		expect(reasonElement2).toBeInTheDocument()
		const descriptionElement = queryByText('DESCRIPTION')
		expect(descriptionElement).toBeNull()
	})

	test('renders with description and remediation', () => {
		const description = 'Example description'
		const remediation = ['Remediation 1', 'Remediation 2']
		const { getByText } = render(<Research description={description} remediation={remediation} />)
		const descriptionElement = getByText('DESCRIPTION')
		const remediationElement = getByText('REMEDIATION')
		const textElement = getByText(description)
		const reasonElement1 = getByText('Remediation 1')
		const reasonElement2 = getByText('Remediation 2')
		expect(descriptionElement).toBeInTheDocument()
		expect(remediationElement).toBeInTheDocument()
		expect(textElement).toBeInTheDocument()
		expect(reasonElement1).toBeInTheDocument()
		expect(reasonElement2).toBeInTheDocument()
	})
})
