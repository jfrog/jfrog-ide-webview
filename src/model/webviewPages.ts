import { ICve } from './cve'
import { IImpactGraph } from './impactGraph'
import { ILicense } from './license'
import { IReference } from './reference'
import { IExtendedInformation } from './extendedInformation'
import { ISeverity } from './severity'
import { IAnalysisStep } from './analysisStep'
import { ISecretFindings } from './secret'
import { IIacFindings } from './iac'
import { LoginProgressStatus, LoginConnectionType } from './login'

export enum PageType {
	Empty = 'EMPTY',
	Dependency = 'DEPENDENCY',
	Eos = 'EOS',
	CveApplicability = 'CVE_APPLICABILITY',
	IaC = 'IAC',
	Secrets = 'SECRETS',
	Login = 'LOGIN'
}

export interface IDependencyPage {
	id: string
	pageType: PageType.Dependency
	componentType: string
	component: string
	version: string
	cve?: ICve
	license?: ILicense[]
	watchName?: string[]
	impactGraph: IImpactGraph
	severity: ISeverity
	edited: string
	summary?: string
	fixedVersion?: string[]
	infectedVersion?: string[]
	references?: IReference[]
	extendedInformation?: IExtendedInformation
}

export interface ISecretsPage {
	pageType: PageType.Secrets
	header: string
	severity: ISeverity
	abbreviation?: string
	location: IAnalysisStep
	description: string
	finding?: ISecretFindings
}

export interface IEosPage {
	pageType: PageType.Eos
	header: string
	location: IAnalysisStep
	description?: string
	remediation?: string[]
	foundText?: string
	analysisStep?: IAnalysisStep[]
	severity?: ISeverity
}

export interface IIaCPage {
	pageType: PageType.IaC
	header: string
	severity: ISeverity
	abbreviation?: string
	location: IAnalysisStep
	description: string
	finding?: IIacFindings
}

export interface ILoginPage {
	pageType: PageType.Login
	url: string
	status: LoginProgressStatus
	connectionType: LoginConnectionType
}

export type WebviewPage = IDependencyPage | IEosPage | IIaCPage | ISecretsPage | ILoginPage
