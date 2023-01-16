import { TreeNode } from '../../../model/treeNode'
import clone from 'clone'
import css from './TreeViewer.module.css'
// @ts-ignore
import { AnimatedTree } from 'react-tree-graph'

export interface Props {
  activeNode?: string
  filter: string
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

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleClick = (event: any, node: string) => {
		props.handleClick(node)
	}
	if (!root) {
		return <></>
	}
	return (
		<main>
			<AnimatedTree
				data={root}
				height={calcWindowHeighth(root.Width) * 0.95}
				width={calcWindowWidth(root.Height, root.EdgeLength)}
				margins={{ bottom: 0, left: 5, right: root.LeafNameLength * 7, top: 0 }}
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

const calcWindowWidth = (treeHeight:number, extraMargin:number) =>
	 treeHeight * (100 + (extraMargin * 4))

const calcWindowHeighth = (treeWidth:number) => {
	switch (treeWidth) {
		case 1:
			return 50
		case 2:
		case 3:
		case 4:
			return 200
		default:
			return	treeWidth * 50
	}
}