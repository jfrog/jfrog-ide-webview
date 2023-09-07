import { render } from '@testing-library/react'
import IaC from './IaC'
import { IIaCPage, PageType } from '../../../model/webviewPages'
import { ISeverity } from '../../../model/severity'
import { LABELS } from '../../UI/InformationTabs/WhatCanIDoTab'
import { TABS } from '../../UI/InformationTabs/InformationTabs'

describe('IaC component', () => {
	const mockData: IIaCPage = {
		pageType: PageType.IaC,
		severity: ISeverity.High,
		header: 'IaC Vulnerability',
		location: {
			file: 'example-file.tf',
			startRow: 10,
			startColumn: 5,
			endRow: 12,
			endColumn: 8
		},
		abbreviation: 'ABC',
		description: 'This is a vulnerability description.',
		finding: {
			snippet: 'Example code snippet',
			happen: 'How it happens',
			meaning: 'Meaning of the vulnerability',
			do: 'What to do about it'
		}
	}
	test('renders IaC component with patch the code and right header', () => {
		const { getByText } = render(<IaC data={mockData} />)

		expect(getByText('IaC Vulnerability')).toBeInTheDocument()
		expect(getByText(`Location:`)).toBeInTheDocument()
		expect(getByText(mockData.location.file)).toBeInTheDocument()
		expect(getByText(TABS.WHAT_CAN_I_DO.label)).toBeInTheDocument()
		expect(getByText(TABS.MORE_INFORMATION.label)).toBeInTheDocument()
		expect(getByText(LABELS.PATCH_THE_CODE)).toBeInTheDocument()
		expect(getByText('Remediation')).toBeInTheDocument()
	})

	test('renders IaC component without abbreviation', () => {
		const dataWithoutAbbreviation = { ...mockData, abbreviation: undefined }
		const { queryByText } = render(<IaC data={dataWithoutAbbreviation} />)

		expect(queryByText('Abbreviation')).toBeNull()
	})

	test('renders IaC component without finding', () => {
		const dataWithoutFinding = { ...mockData, finding: undefined }
		const { queryByText } = render(<IaC data={dataWithoutFinding} />)

		expect(queryByText('Example code snippet')).toBeNull()
		expect(queryByText('How it happens')).toBeNull()
		expect(queryByText('Meaning of the vulnerability')).toBeNull()
		expect(queryByText('What to do about it')).toBeNull()
	})
})
