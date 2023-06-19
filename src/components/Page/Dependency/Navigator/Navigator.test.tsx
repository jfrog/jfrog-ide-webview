import { render, screen, fireEvent } from '@testing-library/react'
import Navigator from './Navigator'
import { ISeverity } from '../../../../model/severity'
import { IDependencyPage, PageType } from '../../../../model/webviewPages'
import { IExtendedInformation } from '../../../../model/extendedInformation'

describe('Navigator component', () => {
	const mockData: IDependencyPage = {
		id: '12345',
		pageType: PageType.Dependency,
		component: 'TestComponent',
		componentType: 'TestComponentType',
		version: '1.0.0',
		severity: ISeverity.High,
		edited: '2023-05-21T10:00:00Z',
		extendedInformation: {
			shortDescription: 'Short Description',
			fullDescription: 'Full Description',
			remediation: 'Remediation Steps',
			jfrogResearchSeverity: ISeverity.Low,
			jfrogResearchSeverityReason: [
				{
					name: 'Reason 1',
					description: 'Reason 1 Description',
					isPositive: true
				},
				{
					name: 'Reason 2',
					description: 'Reason 2 Description',
					isPositive: false
				}
			]
		} as IExtendedInformation,
		cve: {
			id: 'CVE-2021-12345',
			cvssV2Score: '7.5',
			cvssV2Vector: 'AV:N/AC:L/Au:N/C:P/I:P/A:P',
			cvssV3Score: '9.8',
			cvssV3Vector: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H',
			applicableData: {
				isApplicable: true,
				evidence: [
					{
						reason: 'Reason 1',
						filePathEvidence: '/path/to/file1',
						codeEvidence: 'Code evidence 1'
					},
					{
						reason: 'Reason 2',
						filePathEvidence: '/path/to/file2',
						codeEvidence: 'Code evidence 2'
					}
				],
				searchTarget: 'Search Target'
			}
		},
		references: [
			{
				text: 'Reference 1',
				url: 'https://example.com/reference1'
			},
			{
				text: 'Reference 2',
				url: 'https://example.com/reference2'
			}
		],
		impactGraph: {
			name: 'Root',
			children: [
				{
					name: 'Child 1',
					children: [
						{
							name: 'Grandchild 1'
						},
						{
							name: 'Grandchild 2'
						}
					]
				},
				{
					name: 'Child 2'
				}
			]
		}
	}

	test('renders the Navigator component with all tabs', () => {
		render(<Navigator data={mockData} />)
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

	test('renders the PageHolder component with the research tab content', () => {
		render(<Navigator data={mockData} />)

		const researchTabContent = screen.getByText('Short Description')
		expect(researchTabContent).toBeInTheDocument()
	})

	test('renders the PageHolder component with the contextual analysis tab content', () => {
		render(<Navigator data={mockData} />)

		fireEvent.click(screen.getByRole('button', { name: 'JFrog Research' }))
		expect(screen.getByText('Reason 1')).toBeInTheDocument()
	})

	test('renders the PageHolder component with the public sources tab content', () => {
		render(<Navigator data={mockData} />)
		fireEvent.click(screen.getByRole('button', { name: 'Public Sources' }))
		expect(screen.getByText('CVSS BREAKDOWN')).toBeInTheDocument()
	})

	test('renders the PageHolder component with the impact graph tab content', () => {
		render(<Navigator data={mockData} />)
		fireEvent.click(screen.getByRole('button', { name: 'Impact Graph' }))
		expect(screen.getByText('Root')).toBeInTheDocument()
	})

	test('renders the PageHolder component with the references tab content', () => {
		render(<Navigator data={mockData} />)
		fireEvent.click(screen.getByRole('button', { name: 'References' }))
		expect(screen.getByText('Reference 1')).toBeInTheDocument()
	})

	test('hides the appropriate tabs based on data conditions', () => {
		const hiddenTabs = ['Contextual Analysis', 'Public Sources', 'References']

		render(<Navigator data={{ ...mockData, cve: undefined, references: [] }} />)

		hiddenTabs.forEach(tabText => {
			const hiddenTab = screen.queryByText(tabText)
			expect(hiddenTab).not.toBeInTheDocument()
		})
	})
})
