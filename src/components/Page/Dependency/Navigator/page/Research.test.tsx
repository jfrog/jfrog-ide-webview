import { render, screen } from '@testing-library/react'
import Research, { LABELS, Props } from './Research'
import { IExtendedInformation, ISeverityReasons } from '../../../../../model/extendedInformation'
import { ISeverity } from '../../../../../model/severity'

describe('Research component', () => {
	test('renders the component with summary and without remediation, details, and jfrog research severity reasons', () => {
		const data: IExtendedInformation = {
			shortDescription: 'Short Description',
			fullDescription: 'fullDescription',
			jfrogResearchSeverity: ISeverity.High
		}

		const mockData: Props = {
			data: data
		}

		render(<Research {...mockData} />)

		// Check if the summary headline is rendered
		expect(screen.getByText(LABELS.SUMMARY)).toBeInTheDocument()

		// Check if the short description text is rendered
		expect(screen.getByText(data.shortDescription)).toBeInTheDocument()

		// Check if the details headline is rendered
		expect(screen.getByText(LABELS.DETAILS)).toBeInTheDocument()

		// Check if no details markdown is rendered
		expect(screen.queryByText(data.fullDescription)).toBeInTheDocument()
	})

	test('renders the component with summary, remediation, details, and jfrog research severity reasons', () => {
		const reasons: ISeverityReasons[] = [
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

		const data: IExtendedInformation = {
			shortDescription: 'Short Description',
			remediation: 'Remediation Content',
			fullDescription: 'Details Content',
			jfrogResearchSeverity: ISeverity.High,
			jfrogResearchSeverityReason: reasons
		}

		const mockData: Props = {
			data: data
		}

		render(<Research {...mockData} />)

		// Check if the summary headline is rendered
		expect(screen.getByText(LABELS.SUMMARY)).toBeInTheDocument()

		// Check if the short description text is rendered
		expect(screen.getByText(data.shortDescription)).toBeInTheDocument()

		// Check if the remediation headline is rendered
		expect(screen.getByText(LABELS.REMEDIATION)).toBeInTheDocument()

		// Check if the remediation text is rendered
		expect(screen.getByText(data.remediation as string)).toBeInTheDocument()

		// Check if the details headline is rendered
		expect(screen.getByText(LABELS.DETAILS)).toBeInTheDocument()

		// Check if the details markdown is rendered
		expect(screen.getByText(data.fullDescription)).toBeInTheDocument()

		// Check if the jfrog research severity reasons headline is rendered
		expect(screen.getByText(LABELS.JFROG_RESEARCH_SEVERITY_REASONS)).toBeInTheDocument()

		// Check if the jfrog research severity reasons content is rendered correctly
		for (const reason of reasons) {
			expect(screen.getByText(reason.name)).toBeInTheDocument()
			expect(screen.getByText(reason.description)).toBeInTheDocument()
		}
	})
})
