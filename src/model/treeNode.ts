
export class TreeNode {
	gProps?: CustomTreeNodeData

	height = 1

	width = 1

	edgeLength = 1

	leafNameLength = 1

	children: TreeNode[] = []

	constructor(private id:string, private name:string) {
		this.edgeLength = name.length
		this.leafNameLength = name.length
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
		this.updateTreeDimensionOnAddChildren()
	}

	public AddChild(child: TreeNode) {
		this.children.push(child)
		this.updateTreeDimensionOnAddChild(child)
		this.updateNewSubTreeDimension(child)
	}

	private updateTreeDimensionOnAddChild(child: TreeNode) {
		this.height = Math.max(child.height + 1, this.height)
		if (this.children.length === 1) {
			this.width = child.width
		} else {
			this.width += child.width
		}
	}

	private updateNewSubTreeDimension(child: TreeNode) {
		this.edgeLength = Math.max(child.EdgeLength, this.edgeLength)
		this.leafNameLength = child.LeafNameLength
	}

	public set ClassName(className : string) {
		this.gProps = { className: className }
	}

	public get Name() : string {
		return this.name
	}

	public set Name(name : string) {
		this.name = name
	}

	public get Height() : number {
		return this.height
	}

	public get Width() : number {
		return this.width
	}

	public get GProps() : CustomTreeNodeData {
		return this.GProps
	}

	public get EdgeLength() : number {
		return this.edgeLength
	}

	public get LeafNameLength() : number {
		return this.leafNameLength
	}

	public set LeafNameLength(length: number) {
		this.leafNameLength = length
	}

	public updateTreeDimensionOnAddChildren() {
		this.height = 1
		this.width = 0
		this.edgeLength = this.name.length
		this.children.forEach(child => {
			this.updateTreeDimensionOnAddChild(child)
			this.updateNewSubTreeDimension(child)
		})
	}
}

interface CustomTreeNodeData {
	className:string
}