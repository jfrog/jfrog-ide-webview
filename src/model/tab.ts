export interface ITab {
	tabKey: ActiveTab
	text: string
	hide: boolean
}

export enum ActiveTab {
	None = 'None',
	Research = 'research',
	ContextualAnalysis = 'contextualAnalysis',
	PublicSources = 'publicSources',
	ImpactGraph = 'impactGraph',
	Reference = 'reference'
}
