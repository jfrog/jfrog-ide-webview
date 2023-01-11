import { TreeNode } from '../../../../../model/treeNode'
import TreeContainer from '../../../../UI/TreeViewer/TreeContainer'

export interface Props {
  treeNode: TreeNode
  vulnerableComponentName:string
}

const ImpactedPath = (props: Props) => <TreeContainer
	root={props.treeNode}
	marginRight={props.vulnerableComponentName.length}/>


export default ImpactedPath