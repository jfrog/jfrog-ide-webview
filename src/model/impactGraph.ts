export interface IImpactGraph {
	root: IImpactGraphNode
	pathsCount?: number
	pathsLimit?: number
}

export interface IImpactGraphNode {
	name: string
	children?: IImpactGraphNode[]
}
