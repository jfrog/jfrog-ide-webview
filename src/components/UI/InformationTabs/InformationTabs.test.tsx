import { render, screen } from '@testing-library/react'
import InformationTabs, { TABS } from './InformationTabs'
import {
	IApplicableDetails,
	ICve,
	IDependencyPage,
	ISastPage,
	IEvidence,
	IExtendedInformation,
	IIaCPage,
	ISecretsPage,
	ISeverity,
	PageType,
	Applicability
} from '../../../model'

describe('InformationTabs component', () => {
	const dependencyPageData: IDependencyPage = {
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
				applicability: Applicability.APPLICABLE,
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
	const sastPageData: ISastPage = {
		severity: ISeverity.High,
		pageType: PageType.Sast,
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
	const iacPageData: IIaCPage = {
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
	const secretsPageData: ISecretsPage = {
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
	test('renders the InformationTabs component with Dependency page tabs: what_can_i_do, cve_information, impact_graph', () => {
		render(
			<InformationTabs
				tabs={[TABS.WHAT_CAN_I_DO.key, TABS.CVE_INFORMATION.key, TABS.IMPACT_GRAPH.key]}
				data={dependencyPageData}
			/>
		)
		expect(screen.getByText(TABS.WHAT_CAN_I_DO.label)).toBeInTheDocument()
		expect(screen.getByText(TABS.CVE_INFORMATION.label)).toBeInTheDocument()
		expect(screen.getByText(TABS.IMPACT_GRAPH.label)).toBeInTheDocument()
	})

	test('renders the InformationTabs component with Secret page tabs: what_can_i_do, more_information', () => {
		render(
			<InformationTabs
				tabs={[TABS.WHAT_CAN_I_DO.key, TABS.MORE_INFORMATION.key]}
				data={secretsPageData}
			/>
		)
		expect(screen.getByText(TABS.WHAT_CAN_I_DO.label)).toBeInTheDocument()
		expect(screen.getByText(TABS.MORE_INFORMATION.label)).toBeInTheDocument()
	})

	test('renders the InformationTabs component with IaC page tabs: what_can_i_do, more_information', () => {
		render(
			<InformationTabs
				tabs={[TABS.WHAT_CAN_I_DO.key, TABS.MORE_INFORMATION.key]}
				data={iacPageData}
			/>
		)
		expect(screen.getByText(TABS.WHAT_CAN_I_DO.label)).toBeInTheDocument()
		expect(screen.getByText(TABS.MORE_INFORMATION.label)).toBeInTheDocument()
	})

	test('renders the InformationTabs component with SAST page tabs: what_can_i_do, more_information', () => {
		render(
			<InformationTabs
				tabs={[TABS.WHAT_CAN_I_DO.key, TABS.MORE_INFORMATION.key]}
				data={sastPageData}
			/>
		)
		expect(screen.getByText(TABS.WHAT_CAN_I_DO.label)).toBeInTheDocument()
		expect(screen.getByText(TABS.MORE_INFORMATION.label)).toBeInTheDocument()
	})
})
