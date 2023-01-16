import { useState } from 'react'
import { TreeNode } from '../../../model/treeNode'
import Header from './Header'
import TreeViewer from './TreeViewer'
import css from './TreeContainer.module.css'

export interface Props {
  root: TreeNode
}

const TreeContainer = (props: Props) => {
	const filterHandler = (filter: string) => {
		setFilter(filter)
	}
	const activeNodeHandler = (nodeName: string) => {
		setActiveNode(nodeName)
	}

	const [filter, setFilter] = useState('')
	const [activeNode, setActiveNode] = useState(undefined as string | undefined)

	return (
		<div id="container">
			<Header filter={filter} OnFilter={filterHandler} OnActiveNode={activeNodeHandler}/>
			<div className={css.container}>
				<TreeViewer
					activeNode={activeNode}
					root={props.root}
					filter={filter}
					handleClick={activeNodeHandler}/>
			</div>
		</div>
	)
}

export default TreeContainer