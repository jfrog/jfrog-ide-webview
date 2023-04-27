import { PageType } from './pageType'
import { ISeverity } from './severity'
import { IAnalysisStep } from './analysisStep'

export interface ISecretsPage {
	pageType: PageType.Secrets
	header: string
	severity: ISeverity
	abbreviation?: string
	location: IAnalysisStep
	description: string
	finding?: ISecretFindings
}
export interface ISecretFindings {
	snippet?: string
	meaning?: string
	happen?: string
	do?: string
}
