import { queryByAttribute, render } from '@testing-library/react'
import Eos from './Eos'
import { IEosPage, PageType } from '../../../model/webviewPages'
import { ISeverity } from '../../../model/severity'
import { getByTextAcrossMultipleElements } from '../../../utils/testUtils'
import { TABS } from '../../UI/InformationTabs/InformationTabs'

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
		ruleId: 'ruleId-1',
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
		const el = render(<Eos data={mockData} />)
		const getById = queryByAttribute.bind(null, 'id')
		const severityIcon = getById(el.container, mockData.severity?.toLowerCase() ?? '')
		expect(severityIcon).not.toBeNull()
	})

	test('renders vulnerability location', () => {
		const { getByText } = render(<Eos data={mockData} />)
		const vulnerabilityElement = getByTextAcrossMultipleElements(
			getByText,
			'Location: /path/to/file'
		)
		expect(vulnerabilityElement).toBeInTheDocument()
	})

	test('renders more info tab', () => {
		const { getByText } = render(<Eos data={mockData} />)
		const moreInfoTab = getByText(TABS.MORE_INFORMATION.label)
		expect(moreInfoTab).toBeInTheDocument()
	})

	test('renders remediation 1', () => {
		const { getByText } = render(<Eos data={mockData} />)
		const remediationElement1 = getByText('Remediation 1')
		expect(remediationElement1).toBeInTheDocument()
	})

	test('renders remediation 2', () => {
		const { getByText } = render(<Eos data={mockData} />)
		const remediationElement2 = getByText('Remediation 2')
		expect(remediationElement2).toBeInTheDocument()
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
