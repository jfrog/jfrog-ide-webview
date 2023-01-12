import { TreeNode } from '../../../model/treeNode'
import clone from 'clone'
import css from './TreeViewer.module.css'
// @ts-ignore
import { AnimatedTree } from 'react-tree-graph'

export interface Props {
  activeNode?: string
  filter: string
  marginRight: number
  root: TreeNode
  handleClick: (nodeId: string) => void
}

export default function TreeViewer(props: Props) {
	function getRoot(node: TreeNode): TreeNode | undefined {
		if (node.Id === props.activeNode) {
			return node
		}
		if (!node.Children) {
			return undefined
		}
		for (let i = 0; i < node.Children?.length; i++) {
			const childJson = getRoot(node.Children[i])
			if (childJson) {
				return childJson
			}
		}
		return undefined
	}

	function buildSubTree(root?: TreeNode): TreeNode | undefined {
		const newChildren: TreeNode[] = []
		if (!root || !root.Children) {
			return undefined
		}
		for (let i = 0; i < root.Children?.length || 0; i++) {
			const child = buildSubTree(root.Children[i])
			if (child) {
				newChildren.push(child)
			}
		}
		if (newChildren.length > 0) {
			root.Children = newChildren
		}
		if (newChildren.length > 0 || root.Id.toLowerCase().indexOf(props.filter.toLowerCase()) !== -1) {
			return root
		}
		return undefined
	}

	let root = clone(props.activeNode ? getRoot(props.root) : props.root)

	if (props.filter) {
		const SubTree = buildSubTree(root)
		if (SubTree) {
			root = SubTree
		}
	}
	root?.updateTreeDimension()

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleClick = (event: any, node: string) => {
		props.handleClick(node)
	}
	return (
		<main>
			<AnimatedTree
				data={root}
				height={calcWindowHeighth(root?.SubTreeWidth) * 0.95}
				width={calcWindowWidth(root?.SubTreeHeight, props.marginRight)}
				margins={{ bottom: 0, left: 5, right: props.marginRight * 7, top: 0 }}
				keyProp="id"
				gProps={{
					className: `${css.node} `,
					onClick: handleClick
				}}
				pathProps={{
					className: `${css.path} ${css.link} `
				}}
				textProps={{
					dy: 3.5
				}}
				steps={30}/>
		</main>
	)
}
const calcWindowWidth = (treeHeight:number | undefined, extraMargin:number) =>
	 (treeHeight || 1) * (100 + (extraMargin * 5))


const calcWindowHeighth = (treeWidth:number | undefined) => {
	switch (treeWidth) {
		case undefined:
		case 1:
			return 50
		case 2:
			return 100
		case 3:
			return 100
		case 4:
			return 200
		default:
			return	treeWidth * 50
	}
}