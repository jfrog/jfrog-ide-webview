import { render, screen } from '@testing-library/react'
import {
	IApplicableDetails,
	ICve,
	IDependencyPage,
	ISastPage,
	IEvidence,
	IExtendedInformation,
	IIaCPage,
	IImpactGraph,
	ISecretsPage,
	ISeverity,
	PageType,
	Applicability
} from '../../../model'
import WhatCanIDoTab, { LABELS } from './WhatCanIDoTab'

describe('WhatCanIDoTab component', () => {
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
	test('renders the WhatCanIDoTab component with remediation section', () => {
		render(<WhatCanIDoTab pageType={PageType.Sast} remediation={['Remediation 1']} />)
		expect(screen.getByText('Remediation 1')).toBeInTheDocument()
	})
	test('renders the WhatCanIDoTab for dependency page', () => {
		render(
			<WhatCanIDoTab
				pageType={dependencyPageData.pageType}
				component={dependencyPageData.component}
				impactGraph={dependencyPageData.impactGraph}
				fixedVersion={dependencyPageData.fixedVersion}
				remediation={['Remediation 1']}
			/>
		)
		expect(screen.getByText('Remediation 1')).toBeInTheDocument()
		expect(screen.getByText(LABELS.PATCH_THE_CODE)).toBeInTheDocument()
		expect(screen.getByText(LABELS.REMEDIATION)).toBeInTheDocument()
		expect(screen.getByText(LABELS.UPDATE_THE_INDIRECT_DEPENDENCY)).toBeInTheDocument()
		expect(screen.getByText(LABELS.UPDATE_THE_DIRECT_DEPENDENCY)).toBeInTheDocument()
	})
	test('renders the WhatCanIDoTab for indirect dependency page', () => {
		const indirectImpactGraph: IImpactGraph = {
			root: {
				name: 'gallery_server:1.0.0',
				children: [
					{
						name: 'parse-url:6.0.5',
						children: [
							{
								name: 'parse-path:4.0.4'
							}
						]
					}
				]
			}
		}
		render(
			<WhatCanIDoTab
				pageType={dependencyPageData.pageType}
				component={dependencyPageData.component}
				impactGraph={indirectImpactGraph}
				fixedVersion={dependencyPageData.fixedVersion}
				remediation={['Remediation 1']}
			/>
		)
		expect(screen.getByText('Remediation 1')).toBeInTheDocument()
		expect(screen.getByText(LABELS.PATCH_THE_CODE)).toBeInTheDocument()
		expect(screen.getByText(LABELS.REMEDIATION)).toBeInTheDocument()
		expect(screen.getByText(LABELS.UPDATE_THE_DIRECT_DEPENDENCY)).toBeInTheDocument()
		expect(screen.getByText(LABELS.UPDATE_THE_INDIRECT_DEPENDENCY)).toBeInTheDocument()
	})
	test('renders the WhatCanIDoTab for iac page', () => {
		render(<WhatCanIDoTab pageType={iacPageData.pageType} remediation={['Remediation 1']} />)
		expect(screen.getByText(LABELS.PATCH_THE_CODE)).toBeInTheDocument()
		expect(screen.getByText(LABELS.REMEDIATION)).toBeInTheDocument()
	})
	test('renders the WhatCanIDoTab for secrets page', () => {
		render(<WhatCanIDoTab pageType={secretsPageData.pageType} remediation={['Remediation 1']} />)
		expect(screen.getByText(LABELS.PATCH_THE_CODE)).toBeInTheDocument()
		expect(screen.getByText(LABELS.REMEDIATION)).toBeInTheDocument()
		expect(screen.getByText(LABELS.SUPPRESS_THE_FINDING)).toBeInTheDocument()
	})
	test('renders the WhatCanIDoTab for SAST page', () => {
		render(<WhatCanIDoTab pageType={sastPageData.pageType} remediation={['Remediation 1']} />)
		expect(screen.getByText(LABELS.PATCH_THE_CODE)).toBeInTheDocument()
		expect(screen.getByText(LABELS.REMEDIATION)).toBeInTheDocument()
		expect(screen.getByText(LABELS.SUPPRESS_THE_FINDING)).toBeInTheDocument()
	})
})
