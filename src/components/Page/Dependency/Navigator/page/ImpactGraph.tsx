import { TreeNode } from '../../../../../model/treeNode'
import TreeContainer from '../../../../UI/TreeViewer/TreeContainer'

export interface Props {
	treeNode: TreeNode
	pathsCount?: number
	pathsLimit?: number
}

export default function ImpactGraph(props: Props): JSX.Element {
	return (
		<TreeContainer
			root={props.treeNode}
			pathsCount={props.pathsCount}
			pathsLimit={props.pathsLimit}
		/>
	)
}
