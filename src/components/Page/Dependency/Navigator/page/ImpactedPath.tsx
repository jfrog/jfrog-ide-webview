import { TreeNode } from '../../../../../model/treeNode'
import TreeViewer from '../../../../UI/TreeViewer/TreeViewer'
import { useState, useEffect } from 'react'

export interface Props {
  treeNode: TreeNode
  parentRef: React.RefObject<HTMLDivElement>
}

const ImpactedPath = (props: Props) => {
	const [resize, setResize] = useState({ height: 0, width: 0 })
	const resizeHandler = () => {
		if (props.parentRef.current) {
			setResize({
				height: props.parentRef.current.clientHeight,
				width: props.parentRef.current.clientWidth
			})
		}
	}
	useEffect(() =>	{
		resizeHandler()
	}, [])
	window.onresize = () =>	resizeHandler()
	if (resize.width === 0 || resize.height === 0) {
		return <></>
	}
	return <TreeViewer height={resize.height} width={resize.width} root={props.treeNode}/>
}


export default ImpactedPath