import { render, screen } from '@testing-library/react'
import Dependency from './Dependency'
import {
	IDependencyPage,
	PageType,
	ISeverity,
	IApplicableDetails,
	ICve,
	IEvidence,
	IExtendedInformation
} from '../../../model'

describe('Dependency page component', () => {
	const mockData: IDependencyPage = {
		id: 'example-id',
		pageType: PageType.Dependency,
		componentType: 'componentType-example',
		component: 'example-component',
		version: '1.0.0',
		severity: ISeverity.High,
		cve: {
			id: 'CVE-2021-1234',
			cvssV2Score: '4.0',
			cvssV2Vector: 'CVSS:2.0/AV:N/AC:L/Au:S/C:N/I:N/A:P',
			cvssV3Score: '6.5',
			cvssV3Vector: 'CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:L/A:H',
			applicableData: {
				isApplicable: true,
				searchTarget: 'search target',
				evidence: [
					{
						filePathEvidence: 'filePathEvidence',
						codeEvidence: 'codeEvidence',
						reason: 'applicable reason'
					} as IEvidence
				]
			} as IApplicableDetails
		} as ICve,
		edited: '2022-01-01',
		extendedInformation: {
			shortDescription: 'Short description',
			fullDescription: 'Full description',
			remediation: 'Remediation steps',
			jfrogResearchSeverity: ISeverity.Low,
			jfrogResearchSeverityReason: []
		} as IExtendedInformation,
		impactGraph: {
			name: 'Impact Graph'
		},
		pathsCount: 1,
		pathsLimit: 10,
		references: [{ url: 'url' }]
	}
	test('should render "JFrog Research last update"', () => {
		render(<Dependency data={mockData} />)

		expect(
			screen.getByText(/JFrog Research last updated on Sat, 01 Jan 2022 00:00:00 GMT/i)
		).toBeInTheDocument()
	})

	test('should render "Component: example-component"', () => {
		render(<Dependency data={mockData} />)

		expect(screen.getByText(/Component:/i)).toBeInTheDocument()
		expect(screen.getByText(/example-component/i)).toBeInTheDocument()
	})

	test('should render "Contextual Analysis"', () => {
		render(<Dependency data={mockData} />)

		expect(screen.getByText(/Contextual Analysis:/i)).toBeInTheDocument()
		expect(screen.getByText(/The CVE is Applicable/i)).toBeInTheDocument()
	})
	test('should render "Fixed version"', () => {
		render(<Dependency data={mockData} />)

		expect(screen.getByText(/Fixed version:/i)).toBeInTheDocument()
		expect(screen.getByText(/None/i)).toBeInTheDocument()
	})

	test('should render "Severity"', () => {
		render(<Dependency data={mockData} />)

		expect(screen.getByText(/High/i)).toBeInTheDocument()
	})

	test('should render "JFrog severity"', () => {
		render(<Dependency data={mockData} />)

		expect(screen.getByText(/JFrog severity:/i)).toBeInTheDocument()
		expect(screen.getByText(/Low/i)).toBeInTheDocument()
	})

	test('should render "Type"', () => {
		render(<Dependency data={mockData} />)

		expect(screen.getByText(/componentType-example/i)).toBeInTheDocument()
	})

	test('should render "Version"', () => {
		render(<Dependency data={mockData} />)

		expect(screen.getByText(/1.0.0/i)).toBeInTheDocument()
	})

	test('should render "ID"', () => {
		render(<Dependency data={mockData} />)

		expect(screen.getByText(/ID:/i)).toBeInTheDocument()
		expect(screen.getByText(/example-id/i)).toBeInTheDocument()
	})

	test('should render "JFrog Research", "Impact Graph" & "References" tabs', () => {
		render(<Dependency data={mockData} />)

		const expectedTexts = [
			'JFrog Research',
			'Contextual Analysis',
			'Public Sources',
			'Impact Graph',
			'References'
		]
		const buttons = screen.getAllByRole('button')

		expect(buttons.length).toBe(expectedTexts.length)
		buttons.forEach((button, index) => {
			expect(button).toHaveTextContent(expectedTexts[index])
		})
	})

	describe('Without extended information', () => {
		test('should render "Public Sources", "Impact Graph", "Contextual Analysis" & "References" tabs', () => {
			render(<Dependency data={{ ...mockData, extendedInformation: undefined }} />)
			const expectedTexts = ['Contextual Analysis', 'Public Sources', 'Impact Graph', 'References']
			const buttons = screen.getAllByRole('button')

			// Assert that the expected number of buttons are present
			expect(buttons.length).toBe(expectedTexts.length)
			buttons.forEach((button, index) => {
				expect(button).toHaveTextContent(expectedTexts[index])
			})
		})
	})
	describe('Without Contextual Analysis and Public Sources', () => {
		test('should render "Public Sources", "Impact Graph", "Contextual Analysis" & "References" tabs', () => {
			render(<Dependency data={{ ...mockData, cve: { id: '1' } }} />)
			const expectedTexts = ['JFrog Research', 'Impact Graph', 'References']
			const buttons = screen.getAllByRole('button')

			// Assert that the expected number of buttons are present
			expect(buttons.length).toBe(expectedTexts.length)
			buttons.forEach((button, index) => {
				expect(button).toHaveTextContent(expectedTexts[index])
			})
		})
	})

	describe('Without JFrog Research and References', () => {
		test('should render "Public Sources", "Impact Graph", "Contextual Analysis" tabs', () => {
			render(
				<Dependency data={{ ...mockData, extendedInformation: undefined, references: undefined }} />
			)
			const expectedTexts = ['Contextual Analysis', 'Public Sources', 'Impact Graph']
			const buttons = screen.getAllByRole('button')

			// Assert that the expected number of buttons are present
			expect(buttons.length).toBe(expectedTexts.length)
			buttons.forEach((button, index) => {
				expect(button).toHaveTextContent(expectedTexts[index])
			})
		})
	})
})
