import { render } from '@testing-library/react'
import ContextualAnalysis from './ContextualAnalysis'
import { Applicability, IApplicableDetails } from '../../../../../model'
import { getByTextAcrossMultipleElements } from '../../../../../utils/testUtils'

describe('ContextualAnalysis component', () => {
	const testData: IApplicableDetails = {
		evidence: [
			{
				reason: 'Reason 1',
				filePathEvidence: '/path/to/file1',
				codeEvidence: 'Code evidence 1'
			},
			{
				reason: 'Reason 2',
				filePathEvidence: '/path/to/file2',
				codeEvidence: 'Code evidence 2'
			}
		],
		applicability: Applicability.APPLICABLE,
		searchTarget: 'Search target text'
	}

	test('renders the component with evidence and search target', () => {
		const { getByText } = render(<ContextualAnalysis data={testData} />)
		const expectedText = [
			'Why is this CVE applicable?',
			'Reason: Reason 1',
			'Evidence code: Code evidence 1',
			'Reason: Reason 2',
			'Evidence file path: /path/to/file2',
			'What does the scanner checks / looking for?',
			'Evidence file path: /path/to/file1',
			'Evidence code: Code evidence 2',
			'Why is this CVE applicable?'
		]
		expectedText.forEach((element: string) => {
			expect(getByTextAcrossMultipleElements(getByText, element)).toBeInTheDocument()
		})
	})

	test('renders the component without search target', () => {
		const { queryByText } = render(
			<ContextualAnalysis
				data={{ evidence: testData.evidence, applicability: Applicability.NOT_APPLICABLE }}
			/>
		)

		expect(queryByText('What does the scanner checks / looking for?')).toBeNull()
		expect(queryByText('Search target text')).toBeNull()
	})

	test('renders the component without evidence and search target', () => {
		const { queryByText } = render(
			<ContextualAnalysis data={{ applicability: Applicability.NOT_APPLICABLE }} />
		)

		expect(queryByText('What does the scanner checks / looking for?')).toBeNull()
		expect(queryByText('Search target text')).toBeNull()
	})
})
