import clone from 'clone'
import { TreeNode } from '../../../model/treeNode'
import css from './TreeContainer.module.css'
// @ts-ignore
import { AnimatedTree } from 'react-tree-graph'

export interface Props {
  activeNode?: string
  filter: string
  width: number
  height: number
  root: TreeNode
  handleClick: (nodeId: string) => void
}

export default function TreeContainer(props: Props) {
	function getRoot(node: TreeNode): TreeNode | undefined {
		if (node.Id === props.activeNode) {
			return node
		}
		if (!node.children) {
			return undefined
		}
		for (let i = 0; i < node.children?.length; i++) {
			const childJson = getRoot(node.children[i])
			if (childJson) {
				return childJson
			}
		}
		return undefined
	}

	function buildSubTree(root?: TreeNode): TreeNode | undefined {
		const newChildren: TreeNode[] = []
		if (!root || !root.children) {
			return undefined
		}

		for (let i = 0; i < root.children?.length || 0; i++) {
			const child = buildSubTree(root.children[i])
			if (child) {
				newChildren.push(child)
			}
		}

		if (newChildren.length > 0) {
			root.children = newChildren
		}
		if (newChildren.length > 0 || root.Id.toLowerCase().indexOf(props.filter.toLowerCase()) !== -1) {
			return root
		}

		return undefined
	}

	function setClassName(node?: TreeNode) {
		if (!node) {
			return
		}

		node.children?.forEach(setClassName)
		if (!props.filter) {
			return
		}

		node.className = node.Id.toLowerCase().indexOf(props.filter.toLowerCase()) === -1 ? `${css.node} ${css.searchExcluded}` : `${css.node} ${css.searchIncluded}`
	}

	let root = props.activeNode ? getRoot(props.root) : props.root

	root = clone(root)

	if (props.filter) {
		root = buildSubTree(root) || root
	}

	setClassName(root)
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleClick = (event: any, node: string) => {
		props.handleClick(node)
	}

	return (
		<main>
			<AnimatedTree
				data={root}
				height={props.height}
				width={props.width}
				margins={{ bottom: 0, left: 5, right: props.width * 0.2, top: 0 }}
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