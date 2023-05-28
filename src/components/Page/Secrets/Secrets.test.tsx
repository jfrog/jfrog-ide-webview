import { render } from '@testing-library/react'
import Secrets from './Secrets'
import { ISecretsPage, PageType } from '../../../model/webviewPages'
import { ISeverity } from '../../../model/severity'
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

		expect(getByText('Secrets Vulnerability')).toBeInTheDocument()
		expect(getByTextAcrossMultipleElements(getByText, 'Location: example-file.yml: 10'))
	})

	test('renders Secrets component with severity and abbreviation', () => {
		const { getByText } = render(<Secrets data={mockData} />)

		expect(getByTextAcrossMultipleElements(getByText, 'Severity: Medium'))
		expect(getByTextAcrossMultipleElements(getByText, 'Abbreviation: XYZ'))
	})

	test('renders Secrets component with code finding', () => {
		const { getByText } = render(<Secrets data={mockData} />)

		expect(getByText('Example code snippet')).toBeInTheDocument()
		expect(getByText('FINDING')).toBeInTheDocument()
		expect(getByText('How it happens')).toBeInTheDocument()
		expect(getByText('Meaning of the vulnerability')).toBeInTheDocument()
		expect(getByText('What to do about it')).toBeInTheDocument()
	})

	test('renders Secrets component with description', () => {
		const { getByText } = render(<Secrets data={mockData} />)

		expect(getByText('What should I do?')).toBeInTheDocument()
		expect(getByText('What can happen?')).toBeInTheDocument()
		expect(getByText('What Does it mean?')).toBeInTheDocument()
		expect(getByText('Description')).toBeInTheDocument()
		expect(getByText('This is a vulnerability description.')).toBeInTheDocument()
	})
})
