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

export default function TreeViewer(props: Props): JSX.Element {
	function getSelectedNodeSubTree(selectedNode: TreeNode): TreeNode | undefined {
		if (selectedNode.id === props.activeNode) {
			return selectedNode
		}

		if (!selectedNode.children.length) {
			return undefined
		}

		for (const child of selectedNode.children) {
			const childJson = getSelectedNodeSubTree(child)

			if (childJson) {
				return childJson
			}
		}

		return undefined
	}

	function buildSubTree(root?: TreeNode): TreeNode | undefined {
		const newChildren: TreeNode[] = []

		if (!root || root.children.length === 0) {
			return undefined
		}

		for (const child of root.children) {
			const subTree = buildSubTree(child)

			if (subTree) {
				newChildren.push(subTree)
			}
		}

		if (newChildren.length > 0) {
			root.children = newChildren
		}

		if (newChildren.length > 0 || root.id.toLowerCase().includes(props.filter.toLowerCase())) {
			return root
		}

		return undefined
	}

	let root = clone(props.activeNode ? getSelectedNodeSubTree(props.root) : props.root)

	if (props.filter) {
		const subTree = buildSubTree(root)

		if (subTree) {
			root = subTree
		}
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleClick = (event: any, node: string): void => {
		props.handleClick(node)
	}

	if (!root) {
		return <> </>
	}

	return (
		<main>
			<AnimatedTree
				data={root}
				height={calcWindowHeighth(root.width) * 0.95}
				width={calcWindowWidth(root.height, root.edgeLength)}
				margins={{ bottom: 0, left: 5, right: root.leafNameLength * 7, top: 0 }}
				keyProp="_id"
				labelProp="_name"
				gProps={{
					className: `${css.node}`,
					onClick: handleClick
				}}
				pathProps={{
					className: `${css.path} ${css.link}`
				}}
				textProps={{
					dy: 3.5
				}}
				steps={30}/>
		</main>
	)
}

const calcWindowWidth = (treeHeight: number, extraMargin: number): number => treeHeight * (100 + (extraMargin * 4))

const calcWindowHeighth = (treeWidth: number): number => {
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