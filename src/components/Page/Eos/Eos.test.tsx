import { render } from '@testing-library/react'
import Eos from './Eos'
import { IEosPage, PageType } from '../../../model/webviewPages'
import { ISeverity } from '../../../model/severity'
import { getByTextAcrossMultipleElements } from '../../../utils/testUtils'

describe('Eos component', () => {
	const mockData: IEosPage = {
		severity: ISeverity.High,
		pageType: PageType.Eos,
		header: 'Header example',
		location: {
			file: '/path/to/file',
			startRow: 1,
			startColumn: 5,
			endRow: 1,
			endColumn: 10
		},
		description: 'Description example',
		remediation: ['Remediation 1', 'Remediation 2'],
		foundText: 'Found text example',
		analysisStep: [
			{
				file: 'file1.js',
				startRow: 6,
				startColumn: 2,
				endRow: 22,
				endColumn: 222,
				snippet: 'Sample snippet 1'
			},
			{
				file: 'file2.js',
				startRow: 3,
				startColumn: 4,
				endRow: 5,
				endColumn: 6,
				snippet: 'Sample snippet 2'
			}
		]
	}
	test('renders header', () => {
		const { getByText } = render(<Eos data={mockData} />)
		const headerElement = getByText('Header example')
		expect(headerElement).toBeInTheDocument()
	})

	test('renders severity', () => {
		const { getByText } = render(<Eos data={mockData} />)
		const severityElement = getByTextAcrossMultipleElements(getByText, 'Severity: High')
		expect(severityElement).toBeInTheDocument()
	})

	test('renders vulnerability location', () => {
		const { getByText } = render(<Eos data={mockData} />)
		const vulnerabilityElement = getByTextAcrossMultipleElements(
			getByText,
			'Location: /path/to/file'
		)
		expect(vulnerabilityElement).toBeInTheDocument()
	})

	test('renders description', () => {
		const { getByText } = render(<Eos data={mockData} />)
		expect(getByText('DESCRIPTION')).toBeInTheDocument()
		expect(getByText('Description example')).toBeInTheDocument()
	})

	test('renders remediation 1', () => {
		const { getByText } = render(<Eos data={mockData} />)
		expect(getByText('DESCRIPTION')).toBeInTheDocument()
		const remediationElement1 = getByText('Remediation 1')
		expect(remediationElement1).toBeInTheDocument()
	})

	test('renders remediation 2', () => {
		const { getByText } = render(<Eos data={mockData} />)
		const remediationElement2 = getByText('Remediation 2')
		expect(remediationElement2).toBeInTheDocument()
	})

	test('renders found text', () => {
		const { getByText } = render(<Eos data={mockData} />)
		const foundTextElement = getByText('Found text example')
		expect(foundTextElement).toBeInTheDocument()
	})

	test('renders analysis step1 1', () => {
		const { getByText } = render(<Eos data={mockData} />)
		expect(getByText('DATA FLOW ANALYSIS')).toBeInTheDocument()
		const analysisStepElement1 = getByText('Sample snippet 1')
		expect(analysisStepElement1).toBeInTheDocument()
		const vulnerabilityElement = getByText('6:')
		expect(vulnerabilityElement).toBeInTheDocument()
	})

	test('renders analysis snippet 2', () => {
		const { getByText } = render(<Eos data={mockData} />)
		expect(getByText('DATA FLOW ANALYSIS')).toBeInTheDocument()
		const analysisStepElement2 = getByText('Sample snippet 2')
		expect(analysisStepElement2).toBeInTheDocument()
		const vulnerabilityElement = getByText('3:')
		expect(vulnerabilityElement).toBeInTheDocument()
	})

	test('renders what was found', () => {
		const { getByText } = render(<Eos data={mockData} />)
		expect(getByText('WHAT WAS FOUND')).toBeInTheDocument()
		const analysisStepElement2 = getByText('Found text example')
		expect(analysisStepElement2).toBeInTheDocument()
	})

	test('renders with unknown severity when not provided', () => {
		const { getByText } = render(<Eos data={{ ...mockData, severity: undefined }} />)
		const severityElement = getByText('Unknown')
		expect(severityElement).toBeInTheDocument()
	})

	test('does not render description when not provided', () => {
		const { queryByText } = render(<Eos data={{ ...mockData, description: undefined }} />)
		const descriptionElement = queryByText('DESCRIPTION')
		expect(descriptionElement).toBeNull()
	})

	test('does not render remediation when not provided', () => {
		const { queryByText } = render(<Eos data={{ ...mockData, remediation: undefined }} />)
		const remediationElement1 = queryByText('REMEDIATION')
		expect(remediationElement1).toBeNull()
	})

	test('does not render found text when not provided', () => {
		const { queryByText } = render(<Eos data={{ ...mockData, foundText: undefined }} />)
		const remediationElement1 = queryByText('WHAT WAS FOUND')
		expect(remediationElement1).toBeNull()
	})

	test('does not render analysis steps when not provided', () => {
		const { queryByText } = render(<Eos data={{ ...mockData, analysisStep: undefined }} />)
		const analysisStepElement = queryByText('DATA FLOW ANALYSIS')
		expect(analysisStepElement).toBeNull()
	})
})
