import { IImpactedPath, ITreeNode } from '../../../../../model'
import TreeViewer from '../../../../UI/TreeViewer/TreeViewer'

export interface Props {
  id: string
  impactedPath: IImpactedPath
  height: number
  width:number
}

const ImpactedPath = (props: Props) =>
	<TreeViewer id={props.id} height={props.height} width={props.width} root={props.impactedPath as ITreeNode}/>

export default ImpactedPath