import { render, screen } from '@testing-library/react'
import ApplicabilityEvidence from './ApplicabilityEvidence'
import { Applicability, IApplicableDetails, IEvidence } from '../../../../model'

// Sample data for testing
const applicableData: IApplicableDetails = {
	applicability: Applicability.APPLICABLE,
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
	applicability: Applicability.NOT_APPLICABLE,
	searchTarget: 'Example search target',
	evidence: [
		{
			reason: 'Reason for non-applicability'
		} as IEvidence
	]
}

const undeterminedData: IApplicableDetails = {
	applicability: Applicability.UNDETERMINED,
	searchTarget: 'Example search target',
	evidence: [
		{
			reason: 'Reason for undetermined'
		} as IEvidence
	]
}

const missingContextData: IApplicableDetails = {
	applicability: Applicability.MISSING_CONTEXT,
	evidence: [
		{
			reason: 'Irrelevant reason that should be override'
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

	test('renders undetermined CVE information correctly', () => {
		render(<ApplicabilityEvidence data={undeterminedData} />)
		expect(screen.getByText('Contextual Analysis')).toBeInTheDocument()
		expect(
			screen.getByText('Why is this CVE applicability result undetermined?')
		).toBeInTheDocument()
		expect(screen.getByText('Reason for undetermined')).toBeInTheDocument()
		expect(screen.getByText('What does the scanner check/look for?')).toBeInTheDocument()
		expect(screen.getByText('Example search target')).toBeInTheDocument()
	})

	test('renders missing context CVE information correctly', () => {
		render(<ApplicabilityEvidence data={missingContextData} />)
		expect(screen.getByText('Contextual Analysis')).toBeInTheDocument()
		expect(screen.getByText('Why is this CVE missing context?')).toBeInTheDocument()
		expect(
			screen.getByText(
				'Reachability analysis cannot determine the vulnerability’s applicability. Applicability can be determined by scanning the artifact in a Docker repository in the JFrog Platform'
			)
		).toBeInTheDocument()
		expect(screen.queryByText('What does the scanner check/look for?')).not.toBeInTheDocument()
		expect(screen.queryByText('Example search target')).not.toBeInTheDocument()
	})
	test('renders evidence section correctly when no evidence provided', () => {
		const noEvidenceData: IApplicableDetails = {
			applicability: Applicability.APPLICABLE,
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
			applicability: Applicability.APPLICABLE,
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
