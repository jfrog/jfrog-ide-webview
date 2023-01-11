export interface ITreeNode {
  id:string
  name: string
  height:number
  width:number
  children: ITreeNode[]
}

export class TreeNode {
	// eslint-disable-next-line no-useless-constructor
	constructor(protected id:string, protected name:string, protected subTreeHeight:number, protected subTreeWidth:number, protected children: TreeNode[]) {
	}

	public get Id() : string {
		return this.id
	}

	public set Id(id : string) {
		this.id = id
	}

	public get Children() : TreeNode[] {
		return this.children
	}

	public set Children(children : TreeNode[]) {
		this.children = children
	}

	public get Name() : string {
		return this.name
	}

	public set Name(name : string) {
		this.name = name
	}

	public get SubTreeHeight() : number {
		return this.subTreeHeight
	}

	public get SubTreeWidth() : number {
		return this.subTreeWidth
	}

	public updateSubTreeDimension() {
		this.subTreeHeight = 1
		this.subTreeWidth = 1
		this.children.forEach(child => {
			this.subTreeHeight = Math.max(this.subTreeHeight, child.subTreeHeight)
			this.subTreeWidth = Math.max(this.subTreeWidth, child.subTreeWidth)
		})
	}
}

interface CustomTreeNodeData {
	className:string
}

export class CustomTreeNode extends TreeNode {
	gProps: CustomTreeNodeData

	constructor(id:string, name:string, className: string, subTreeHeight:number, subTreeWidth:number, children: TreeNode[]) {
		super(id, name, subTreeHeight, subTreeWidth, children)
		this.gProps = { className: className }
	}
}