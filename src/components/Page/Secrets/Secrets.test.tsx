import { queryByAttribute, render } from '@testing-library/react'
import Secrets from './Secrets'
import { ISecretsPage, PageType } from '../../../model/'
import { ISeverity } from '../../../model'
import { getByTextAcrossMultipleElements } from '../../../utils/testUtils'

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

	test('renders Secrets component with title and location', () => {
		const { getByText } = render(<Secrets data={mockData} />)

		expect(getByText(mockData.header)).toBeInTheDocument()
		expect(getByTextAcrossMultipleElements(getByText, 'Location: example-file.yml'))
	})

	test('renders Secrets component with severity and abbreviation', () => {
		const el = render(<Secrets data={mockData} />)
		const getById = queryByAttribute.bind(null, 'id')
		const severityIcon = getById(el.container, mockData.severity.toLowerCase())
		expect(severityIcon).not.toBeNull()
	})
})
