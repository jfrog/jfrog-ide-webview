import { TreeNode } from '../../../../../model/treeNode'
import TreeViewer from '../../../../UI/TreeViewer/TreeViewer'

export interface Props {
  id: string
  treeNode: TreeNode
  height: number
  width:number
}

const ImpactedPath = (props: Props) =>
	// addIdToTreeNode(props.impactedPath as ITreeNode)
	<TreeViewer id={props.id} height={props.height} width={props.width} root={props.treeNode}/>


export default ImpactedPath