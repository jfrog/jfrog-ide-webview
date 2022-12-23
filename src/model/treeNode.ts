export interface ITreeNode {
  id:string
  name: string
  className?: string
  children: ITreeNode[]
}
export class TreeNode {
	className?: string

	children: TreeNode[] = []

	// eslint-disable-next-line no-useless-constructor
	constructor(private id:string, private name:string) {}


	public get Id() : string {
		return this.id
	}

	public set Id(id : string) {
		this.id = id
	}

	public get Name() : string {
		return this.name
	}

	public set Name(name : string) {
		this.name = name
	}
}