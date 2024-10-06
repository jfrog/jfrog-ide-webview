import { queryByAttribute, render, screen } from '@testing-library/react'
import Dependency from './Dependency'
import {
	IApplicableDetails,
	ICve,
	IDependencyPage,
	IEvidence,
	IExtendedInformation,
	ISeverity,
	PageType
} from '../../../model'
import { TABS } from '../../UI/InformationTabs/InformationTabs'

describe('Dependency page component', () => {
	const mockData: IDependencyPage = {
		id: 'example-id',
		pageType: PageType.Dependency,
		componentType: 'componentType-example',
		component: 'example-component',
		version: '1.0.0',
		severity: ISeverity.High,
		fixedVersion: ['5.0.0'],
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
			root: {
				name: 'Impact Graph'
			},
			pathsLimit: 10
		},
		references: [{ url: 'url' }]
	}
	test('should render "Component: example-component"', () => {
		render(<Dependency data={mockData} />)

		expect(screen.getByText(/Component:/i)).toBeInTheDocument()
		expect(screen.getByText(mockData.component)).toBeInTheDocument()
	})

	test('should render "jfrog_research_icon" and "applicable_icon"', () => {
		const el = render(<Dependency data={mockData} />)
		const getById = queryByAttribute.bind(null, 'id')
		const jfResearchIcon = getById(el.container, 'jfrog_research_icon')
		const applicableIcon = getById(el.container, 'applicable_icon')

		expect(jfResearchIcon).not.toBeNull()
		expect(applicableIcon).not.toBeNull()
	})
	test('should render "not_applicable_icon"', () => {
		const el = render(
			<Dependency
				data={{ ...mockData, cve: { id: mockData.id, applicableData: { isApplicable: false } } }}
			/>
		)
		const getById = queryByAttribute.bind(null, 'id')
		const jfResearchIcon = getById(el.container, 'jfrog_research_icon')
		const notApplicableIcon = getById(el.container, 'not_applicable_icon')

		expect(jfResearchIcon).not.toBeNull()
		expect(notApplicableIcon).not.toBeNull()
	})
	test('should render "Fixed version"', () => {
		render(<Dependency data={mockData} />)

		expect(screen.getByText(/Fix version:/i)).toBeInTheDocument()
		expect(screen.getByText(/5.0.0/i)).toBeInTheDocument()
	})

	test('should render "Severity"', () => {
		const el = render(<Dependency data={mockData} />)
		const getById = queryByAttribute.bind(null, 'id')
		const highIcon = getById(el.container, 'high')
		expect(highIcon).not.toBeNull()
	})

	test('should render "JFrog severity"', () => {
		const el = render(<Dependency data={mockData} />)
		const getById = queryByAttribute.bind(null, 'id')
		const severityIcon = getById(el.container, 'low')
		expect(severityIcon).not.toBeNull()
		expect(screen.getByText(/JFrog severity rank:/i)).toBeInTheDocument()
	})

	test('should render "Version"', () => {
		render(<Dependency data={mockData} />)

		expect(screen.getByText(/1.0.0/i)).toBeInTheDocument()
	})

	test('should render "What Can I Do", "Impact Graph" & "CVE Information" tabs', () => {
		render(<Dependency data={mockData} />)

		const expectedTexts = [
			TABS.WHAT_CAN_I_DO.label,
			TABS.CONTEXTUAL_ANALYSIS.label,
			TABS.CVE_INFORMATION.label,
			TABS.IMPACT_GRAPH.label
		]
		const tabs = screen.getAllByRole('tab')

		expect(tabs.length).toBe(expectedTexts.length)
		tabs.forEach((tab, index) => {
			expect(tab).toHaveTextContent(expectedTexts[index])
		})
	})
})
