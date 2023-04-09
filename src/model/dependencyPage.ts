import { ICve } from './cve'
import { IImpactGraph } from './impactGraph'
import { ILicense } from './license'
import { IReference } from './reference'
import { IExtendedInformation } from './extendedInformation'
import { ISeverity } from './severity'
import { PageType } from './pageType'

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
