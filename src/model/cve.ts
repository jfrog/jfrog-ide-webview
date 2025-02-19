export interface ICve {
	id: string
	cvssV2Score?: string
	cvssV2Vector?: string
	cvssV3Score?: string
	cvssV3Vector?: string
	applicableData?: IApplicableDetails
}

export interface IApplicableDetails {
	applicability: Applicability
	evidence?: IEvidence[]
	searchTarget?: string
}

export interface IEvidence {
	reason: string
	filePathEvidence: string
	codeEvidence: string
}

export enum Applicability {
	APPLICABLE = 'applicable',
	NOT_APPLICABLE = 'not_applicable',
	NOT_COVERED = 'not_covered',
	UNDETERMINED = 'undetermined',
	MISSING_CONTEXT = 'missing_context'
}
