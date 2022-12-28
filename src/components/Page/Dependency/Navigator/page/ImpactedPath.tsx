import { TreeNode } from '../../../../../model/treeNode'
import TreeViewer from '../../../../UI/TreeViewer/TreeViewer'

export interface Props {
  treeNode: TreeNode
  height: number
  width:number
}

const ImpactedPath = (props: Props) =>
	<TreeViewer height={props.height} width={props.width} root={props.treeNode}/>


export default ImpactedPath