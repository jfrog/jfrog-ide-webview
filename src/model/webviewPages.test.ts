import { LoginConnectionType, LoginProgressStatus } from './login'
import { ISeverity } from './severity'
import {
	IDependencyPage,
	ISastPage,
	IIaCPage,
	ILoginPage,
	ISecretsPage,
	PageType
} from './webviewPages'
import { Applicability } from './cve'

describe('Model - WebviewPage', () => {
	test('should have the correct properties for IDependencyPage', () => {
		// Create a sample dependency page object
		const dependencyPage: IDependencyPage = {
			id: '1',
			pageType: PageType.Dependency,
			componentType: 'Component',
			component: 'Sample Component',
			version: '1.0.0',
			cve: {
				id: 'CVE-123',
				cvssV2Score: '7.8',
				cvssV2Vector: 'AV:N/AC:L/Au:N/C:C/I:C/A:C',
				cvssV3Score: '9.2',
				cvssV3Vector: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H',
				applicableData: {
					applicability: Applicability.APPLICABLE,
					evidence: [
						{
							reason: 'Reason',
							filePathEvidence: 'file/path',
							codeEvidence: 'code evidence'
						}
					],
					searchTarget: 'Search Target'
				}
			},
			license: [
				{
					name: 'License 1',
					link: 'https://license1.com'
				},
				{
					name: 'License 2',
					link: 'https://license2.com'
				}
			],
			watchName: ['Watch Name 1', 'Watch Name 2'],
			impactGraph: {
				root: {
					name: 'Impact Graph',
					children: [
						{
							name: 'Child 1',
							children: []
						},
						{
							name: 'Child 2',
							children: []
						}
					]
				}
			},
			severity: ISeverity.High,
			edited: '2022-01-01',
			summary: 'Summary',
			fixedVersion: ['1.1.0'],
			infectedVersion: ['1.0.0'],
			references: [
				{
					text: 'Reference 1',
					url: 'https://reference1.com'
				},
				{
					text: 'Reference 2',
					url: 'https://reference2.com'
				}
			],
			extendedInformation: {
				shortDescription: 'Short Description',
				fullDescription: 'Full Description',
				remediation: 'Remediation',
				jfrogResearchSeverity: ISeverity.High,
				jfrogResearchSeverityReason: [
					{
						name: 'Reason 1',
						description: 'Description 1',
						isPositive: true
					},
					{
						name: 'Reason 2',
						description: 'Description 2',
						isPositive: false
					}
				]
			}
		}

		// Assert the properties
		expect(dependencyPage.id).toBe('1')
		expect(dependencyPage.pageType).toBe(PageType.Dependency)
		expect(dependencyPage.componentType).toBe('Component')
		expect(dependencyPage.component).toBe('Sample Component')
		expect(dependencyPage.version).toBe('1.0.0')
	})

	test('should have the correct properties for ISecretsPage', () => {
		// Create a sample secrets page object
		const secretsPage: ISecretsPage = {
			pageType: PageType.Secrets,
			header: 'Secrets Page',
			severity: ISeverity.Medium,
			abbreviation: 'ABC',
			location: {
				file: 'file/path',
				startRow: 1,
				startColumn: 1,
				endRow: 2,
				endColumn: 2
			},
			description: 'Description',
			finding: {
				snippet: 'Snippet',
				meaning: 'Meaning',
				happen: 'Happen',
				do: 'Do'
			}
		}

		// Assert the properties
		expect(secretsPage.pageType).toBe(PageType.Secrets)
		expect(secretsPage.header).toBe('Secrets Page')
		expect(secretsPage.severity).toBe(ISeverity.Medium)
		expect(secretsPage.abbreviation).toBe('ABC')
	})

	test('should have the correct properties for ISastPage', () => {
		// Create a sample SAST page object
		const sastPage: ISastPage = {
			pageType: PageType.Sast,
			header: 'SAST Page',
			location: {
				file: 'file/path',
				startRow: 1,
				startColumn: 1,
				endRow: 2,
				endColumn: 2
			},
			description: 'Description',
			remediation: ['Remediation 1', 'Remediation 2'],
			foundText: 'Found Text',
			analysisStep: [
				{
					file: 'file1',
					startRow: 1,
					startColumn: 1,
					endRow: 2,
					endColumn: 2
				},
				{
					file: 'file2',
					startRow: 3,
					startColumn: 3,
					endRow: 4,
					endColumn: 4
				}
			],
			severity: ISeverity.Critical
		}

		// Assert the properties
		expect(sastPage.pageType).toBe(PageType.Sast)
		expect(sastPage.header).toBe('SAST Page')
		expect(sastPage.location.file).toBe('file/path')
	})

	test('should have the correct properties for IIaCPage', () => {
		// Create a sample IaC page object
		const iacPage: IIaCPage = {
			pageType: PageType.IaC,
			header: 'IaC Page',
			severity: ISeverity.Low,
			abbreviation: 'DEF',
			location: {
				file: 'file/path',
				startRow: 1,
				startColumn: 1,
				endRow: 2,
				endColumn: 2
			},
			description: 'Description',
			finding: {
				snippet: 'Snippet',
				meaning: 'Meaning',
				happen: 'Happen',
				do: 'Do'
			}
		}

		// Assert the properties
		expect(iacPage.pageType).toBe(PageType.IaC)
		expect(iacPage.header).toBe('IaC Page')
		expect(iacPage.severity).toBe(ISeverity.Low)
		expect(iacPage.abbreviation).toBe('DEF')
	})

	test('should correctly type LoginPage', () => {
		const loginPage: ILoginPage = {
			pageType: PageType.Login,
			url: 'https://example.com',
			status: LoginProgressStatus.Success,
			connectionType: LoginConnectionType.Cli
		}

		expect(loginPage.pageType).toBe(PageType.Login)
		expect(loginPage.url).toBe('https://example.com')
		expect(loginPage.status).toBe(LoginProgressStatus.Success)
		expect(loginPage.connectionType).toBe(LoginConnectionType.Cli)
	})
})
