import { useState } from 'react'
import { TreeNode } from '../../../model/treeNode'
import Header from './Header'
import TreeViewer from './TreeViewer'
import css from './TreeContainer.module.css'
import Wrapper from '../Wrapper/Wrapper'

export interface Props {
  root: TreeNode
}

export default function TreeContainer(props: Props): JSX.Element {
	const filterHandler = (filter: string): void => {
		setFilter(filter)
	}

	const activeNodeHandler = (nodeName: string): void => {
		setActiveNode(nodeName)
	}

	const [filter, setFilter] = useState('')
	const [activeNode, setActiveNode] = useState(undefined as string | undefined)

	return (
		<>
			<Wrapper headline="DESCRIPTION">
				<div className={css.box}>
					<div>
						This graph shows the relationship between the dependencies in the project, which are related to the vulnerable dependencies.
						The dependencies on the right hand side of the graph, are requested directly by the project and marked in red are the vulnerable ones.
					</div>
				</div>
			</Wrapper>
			<Wrapper>
				<Header filter={filter} OnFilter={filterHandler} OnActiveNode={activeNodeHandler}/>
				<div className={css.container}>
					<TreeViewer
						activeNode={activeNode}
						root={props.root}
						filter={filter}
						handleClick={activeNodeHandler}/>
				</div>
			</Wrapper>
		</>
	)
}