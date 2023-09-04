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
			pathsCount: 1,
			pathsLimit: 10
		},
		references: [{ url: 'url' }]
	}
	test('should render "Component: example-component"', () => {
		render(<Dependency data={mockData} />)

		expect(screen.getByText(/Component:/i)).toBeInTheDocument()
		expect(screen.getByText(mockData.component)).toBeInTheDocument()
	})

	test('should render "Contextual Analysis"', () => {
		render(<Dependency data={mockData} />)

		expect(screen.getByAltText('research-icon')).toBeInTheDocument()
		expect(screen.getByAltText('applicable-icon')).toBeInTheDocument()
	})
	test('should render "Fixed version"', () => {
		render(<Dependency data={mockData} />)

		expect(screen.getByText(/Fix version:/i)).toBeInTheDocument()
		expect(screen.getByText(/5.0.0/i)).toBeInTheDocument()
	})

	test('should render "Severity"', () => {
		render(<Dependency data={mockData} />)

		expect(screen.getByAltText(/High/i)).toBeInTheDocument()
	})

	test('should render "JFrog severity"', () => {
		render(<Dependency data={mockData} />)

		expect(screen.getByText(/JFrog severity rank:/i)).toBeInTheDocument()
		expect(screen.getByAltText(/Low/i)).toBeInTheDocument()
	})

	test('should render "Version"', () => {
		render(<Dependency data={mockData} />)

		expect(screen.getByText(/1.0.0/i)).toBeInTheDocument()
	})

	test('should render "What Can I Do", "Impact Graph" & "CVE Information" tabs', () => {
		render(<Dependency data={mockData} />)

		const expectedTexts = [
			TABS.WHAT_CAN_I_DO.label,
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
