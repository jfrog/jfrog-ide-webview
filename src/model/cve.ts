export interface ICve {
	id: string
	cvssV2Score?: string
	cvssV2Vector?: string
	cvssV3Score?: string
	cvssV3Vector?: string
	applicableData?: IApplicableDetails
}

export interface IApplicableDetails {
	isApplicable: boolean
	evidence?: IEvidence[]
	searchTarget?: string
}

export interface IEvidence {
	reason: string
	filePathEvidence: string
	codeEvidence: string
}
