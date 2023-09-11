import { queryByAttribute, render } from '@testing-library/react'
import Secrets from './Secrets'
import { ISecretsPage, PageType } from '../../../model/'
import { ISeverity } from '../../../model'
import { getByTextAcrossMultipleElements } from '../../../utils/testUtils'
import { TABS } from '../../UI/InformationTabs/InformationTabs'
import { LABELS } from '../../UI/InformationTabs/WhatCanIDoTab'

describe('Secrets component', () => {
	const mockData: ISecretsPage = {
		pageType: PageType.Secrets,
		severity: ISeverity.Medium,
		header: 'Secrets Vulnerability',
		location: {
			file: 'example-file.yml',
			startRow: 10,
			startColumn: 5,
			endRow: 12,
			endColumn: 8
		},
		abbreviation: 'XYZ',
		description: 'This is a vulnerability description.',
		finding: {
			snippet: 'Example code snippet',
			happen: 'How it happens',
			meaning: 'Meaning of the vulnerability',
			do: 'What to do about it'
		}
	}

	test('renders Secrets component correctly all components', () => {
		const { getByText } = render(<Secrets data={mockData} />)

		expect(getByText(mockData.header)).toBeInTheDocument()
		expect(getByTextAcrossMultipleElements(getByText, 'Location: example-file.yml'))
		expect(getByText(TABS.WHAT_CAN_I_DO.label)).toBeInTheDocument()
		expect(getByText(TABS.MORE_INFORMATION.label)).toBeInTheDocument()
		expect(getByText(LABELS.PATCH_THE_CODE)).toBeInTheDocument()
		expect(getByText('Remediation')).toBeInTheDocument()
	})

	test('renders Secrets component with severity and abbreviation', () => {
		const el = render(<Secrets data={mockData} />)
		const getById = queryByAttribute.bind(null, 'id')
		const severityIcon = getById(el.container, mockData.severity.toLowerCase())
		expect(severityIcon).not.toBeNull()
	})
})
