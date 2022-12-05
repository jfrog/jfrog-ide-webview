import { IImpactedPath, ITreeNode } from '../../../../../model'
import TreeViewer from '../../../../UI/TreeViewer/TreeViewer'

export interface Props {
  impactedPath: IImpactedPath
  height: number
  width:number
}

const ImpactedPath = (props: Props) =>
	<TreeViewer height={props.height} width={props.width} root={props.impactedPath as ITreeNode}/>

export default ImpactedPath