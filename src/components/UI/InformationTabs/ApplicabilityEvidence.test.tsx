import { render, screen } from '@testing-library/react'
import ApplicabilityEvidence from './ApplicabilityEvidence'
import { IApplicableDetails, IEvidence } from '../../../model'

// Sample data for testing
const applicableData: IApplicableDetails = {
	isApplicable: true,
	searchTarget: 'Example search target',
	evidence: [
		{
			filePathEvidence: 'file/path/evidence',
			codeEvidence: 'const example = "example";',
			reason: 'Reason for applicability'
		} as IEvidence
	]
}

const notApplicableData: IApplicableDetails = {
	isApplicable: false,
	searchTarget: 'Example search target',
	evidence: [
		{
			reason: 'Reason for non-applicability'
		} as IEvidence
	]
}

describe('ApplicabilityEvidence component', () => {
	test('renders applicable CVE information correctly', () => {
		render(<ApplicabilityEvidence data={applicableData} />)
		expect(screen.getByText('Contextual Analysis')).toBeInTheDocument()
		expect(screen.getByText('Why is this CVE applicable?')).toBeInTheDocument()
		expect(screen.getByText('Reason for applicability')).toBeInTheDocument()
		expect(screen.getByText('file/path/evidence')).toBeInTheDocument()
		expect(screen.getByText('const example = "example";')).toBeInTheDocument()
		expect(screen.getByText('What does the scanner check/look for?')).toBeInTheDocument()
		expect(screen.getByText('Example search target')).toBeInTheDocument()
	})

	test('renders non-applicable CVE information correctly', () => {
		render(<ApplicabilityEvidence data={notApplicableData} />)
		expect(screen.getByText('Contextual Analysis')).toBeInTheDocument()
		expect(screen.getByText('Why is this CVE not applicable?')).toBeInTheDocument()
		expect(screen.getByText('Reason for non-applicability')).toBeInTheDocument()
		expect(screen.getByText('What does the scanner check/look for?')).toBeInTheDocument()
		expect(screen.getByText('Example search target')).toBeInTheDocument()
	})

	test('renders evidence section correctly when no evidence provided', () => {
		const noEvidenceData: IApplicableDetails = {
			isApplicable: true,
			searchTarget: 'Example search target',
			evidence: []
		}
		render(<ApplicabilityEvidence data={noEvidenceData} />)
		expect(screen.getByText('Contextual Analysis')).toBeInTheDocument()
		expect(screen.getByText('Why is this CVE applicable?')).toBeInTheDocument()
		expect(screen.getByText('What does the scanner check/look for?')).toBeInTheDocument()
		expect(screen.getByText('Example search target')).toBeInTheDocument()
	})

	test('renders correctly without searchTarget', () => {
		const noSearchTargetData: IApplicableDetails = {
			isApplicable: true,
			evidence: [
				{
					filePathEvidence: 'file/path/evidence',
					codeEvidence: 'const example = "example";',
					reason: 'Reason for applicability'
				} as IEvidence
			]
		}
		render(<ApplicabilityEvidence data={noSearchTargetData} />)
		expect(screen.getByText('Contextual Analysis')).toBeInTheDocument()
		expect(screen.getByText('Why is this CVE applicable?')).toBeInTheDocument()
		expect(screen.getByText('file/path/evidence')).toBeInTheDocument()
		expect(screen.getByText('const example = "example";')).toBeInTheDocument()
		expect(screen.queryByText('What does the scanner check/look for?')).not.toBeInTheDocument()
	})
})
