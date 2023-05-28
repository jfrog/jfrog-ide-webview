export class TreeNode {
	_gProps?: CustomTreeNodeData

	_height = 1

	_width = 1

	_edgeLength = 1

	_leafNameLength = 1

	_children: TreeNode[] = []

	constructor(private _id: string, private _name: string) {
		this._edgeLength = _name.length
		this._leafNameLength = _name.length
	}

	public get id(): string {
		return this._id
	}

	public set id(id: string) {
		this._id = id
	}

	public get children(): TreeNode[] {
		return this._children
	}

	public set children(children: TreeNode[]) {
		this._children = children
		this.updateTreeDimensionOnAddChildren()
	}

	public addChild(child: TreeNode): void {
		this._children.push(child)
		this.updateTreeDimensionOnAddChild(child)
		this.updateNewSubTreeDimension(child)
	}

	private updateTreeDimensionOnAddChild(child: TreeNode): void {
		this._height = Math.max(child._height + 1, this._height)

		if (this._children.length === 1) {
			this._width = child._width
		} else {
			this._width += child._width
		}
	}

	private updateNewSubTreeDimension(child: TreeNode): void {
		this._edgeLength = Math.max(child.edgeLength, this._edgeLength)
		this._leafNameLength = child.leafNameLength
	}

	public set className(className: string) {
		this._gProps = { className: className } as CustomTreeNodeData
	}

	public get name(): string {
		return this._name
	}

	public set name(name: string) {
		this._name = name
	}

	public get height(): number {
		return this._height
	}

	public get width(): number {
		return this._width
	}

	public get gProps(): CustomTreeNodeData | undefined {
		return this._gProps
	}

	public get edgeLength(): number {
		return this._edgeLength
	}

	public get leafNameLength(): number {
		return this._leafNameLength
	}

	public set leafNameLength(length: number) {
		this._leafNameLength = length
	}

	public updateTreeDimensionOnAddChildren(): void {
		this._height = 1
		this._width = 0
		this._edgeLength = this._name.length
		this._children.forEach(child => {
			this.updateTreeDimensionOnAddChild(child)
			this.updateNewSubTreeDimension(child)
		})
	}
}

export interface CustomTreeNodeData {
	className: string
}
