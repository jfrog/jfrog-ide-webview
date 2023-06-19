import { render } from '@testing-library/react'
import IaC from './IaC'
import { IIaCPage, PageType } from '../../../model/webviewPages'
import { ISeverity } from '../../../model/severity'
import { getByTextAcrossMultipleElements } from '../../../utils/testUtils'

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

	test('renders IaC component with title and severity', () => {
		const { getByText } = render(<IaC data={mockData} />)

		expect(getByText('IaC Vulnerability')).toBeInTheDocument()
		expect(getByTextAcrossMultipleElements(getByText, 'Severity: High'))
	})

	test('renders IaC component with location and abbreviation', () => {
		const { getByText } = render(<IaC data={mockData} />)

		expect(getByTextAcrossMultipleElements(getByText, 'Location: example-file.tf: 10'))
		expect(getByTextAcrossMultipleElements(getByText, 'Abbreviation: ABC'))
	})

	test('renders IaC component with description and code snippet', () => {
		const { getByText } = render(<IaC data={mockData} />)

		expect(getByText('Description')).toBeInTheDocument()
		expect(getByText('This is a vulnerability description.')).toBeInTheDocument()
		expect(getByText('Example code snippet')).toBeInTheDocument()
	})

	test('renders IaC component with finding, guidance, and meaning', () => {
		const { getByText } = render(<IaC data={mockData} />)

		expect(getByText('FINDING')).toBeInTheDocument()
		expect(getByText('What should I do?')).toBeInTheDocument()
		expect(getByText('What can happen?')).toBeInTheDocument()
		expect(getByText('What Does it mean?')).toBeInTheDocument()
	})

	test('renders IaC component with code snippet, how it happens, and what to do', () => {
		const { getByText } = render(<IaC data={mockData} />)

		expect(getByText('Example code snippet')).toBeInTheDocument()
		expect(getByText('How it happens')).toBeInTheDocument()
		expect(getByText('Meaning of the vulnerability')).toBeInTheDocument()
		expect(getByText('What to do about it')).toBeInTheDocument()
	})

	test('renders IaC component with title at the end', () => {
		const { getByText } = render(<IaC data={mockData} />)

		expect(getByText('IaC Vulnerability')).toBeInTheDocument()
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
