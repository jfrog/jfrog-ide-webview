export interface ITreeNode {
  id:string
  name: string
  height:number
  width:number
  children: ITreeNode[]
}

export class TreeNode {
	gProps?: CustomTreeNodeData

	constructor(private id:string, private name:string, private treeHeight:number, private treeWidth:number, private children: TreeNode[], className?: string) {
		if (className) {
			this.gProps = { className: className }
		}
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
		return this.treeHeight
	}

	public get SubTreeWidth() : number {
		return this.treeWidth
	}

	public get GProps() : CustomTreeNodeData {
		return this.GProps
	}

	public updateTreeDimension() {
		this.treeHeight = 1
		this.treeWidth = 1
		this.children.forEach(node => {
			this.treeHeight = Math.max(this.treeHeight, node.treeHeight + 1)
			this.treeWidth += node.treeWidth
		})
	}
}

interface CustomTreeNodeData {
	className:string
}