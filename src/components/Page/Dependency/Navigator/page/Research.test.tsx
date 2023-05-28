import { render, screen } from '@testing-library/react'
import Research, { Props } from './Research'
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
		expect(screen.getByText('SUMMARY')).toBeInTheDocument()

		// Check if the short description text is rendered
		expect(screen.getByText('Short Description')).toBeInTheDocument()

		// Check if no remediation headline is rendered
		expect(screen.queryByText('REMEDIATION')).not.toBeInTheDocument()

		// Check if no remediation text is rendered
		expect(screen.queryByText('Remediation Content')).not.toBeInTheDocument()

		// Check if the details headline is rendered
		expect(screen.getByText('DETAILS')).toBeInTheDocument()

		// Check if no details markdown is rendered
		expect(screen.queryByText('fullDescription')).toBeInTheDocument()

		// Check if no jfrog research severity reasons headline is rendered
		expect(screen.queryByText('JFROG RESEARCH SEVERITY REASONS')).not.toBeInTheDocument()

		// Check if no jfrog research severity reasons content is rendered
		expect(screen.queryByText('Reason 1')).not.toBeInTheDocument()
		expect(screen.queryByText('Reason 2')).not.toBeInTheDocument()
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
		expect(screen.getByText('SUMMARY')).toBeInTheDocument()

		// Check if the short description text is rendered
		expect(screen.getByText('Short Description')).toBeInTheDocument()

		// Check if the remediation headline is rendered
		expect(screen.getByText('REMEDIATION')).toBeInTheDocument()

		// Check if the remediation text is rendered
		expect(screen.getByText('Remediation Content')).toBeInTheDocument()

		// Check if the details headline is rendered
		expect(screen.getByText('DETAILS')).toBeInTheDocument()

		// Check if the details markdown is rendered
		expect(screen.getByText('Details Content')).toBeInTheDocument()

		// Check if the jfrog research severity reasons headline is rendered
		expect(screen.getByText('JFROG RESEARCH SEVERITY REASONS')).toBeInTheDocument()

		// Check if the jfrog research severity reasons content is rendered correctly
		expect(screen.getByText('Reason 1')).toBeInTheDocument()
		expect(screen.getByText('Reason 1 Description')).toBeInTheDocument()
		expect(screen.getByText('Reason 2')).toBeInTheDocument()
		expect(screen.getByText('Reason 2 Description')).toBeInTheDocument()
	})
})
