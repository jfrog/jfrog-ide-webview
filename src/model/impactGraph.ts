export interface IImpactGraph {
	root: IImpactGraphNode
	pathsLimit?: number
}

export interface IImpactGraphNode {
	name: string
	children?: IImpactGraphNode[]
}
