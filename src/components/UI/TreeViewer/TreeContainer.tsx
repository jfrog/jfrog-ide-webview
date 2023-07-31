import { useState } from 'react'
import { TreeNode } from '../../../model/treeNode'
import Header from './Header'
import TreeViewer from './TreeViewer'
import css from './TreeContainer.module.css'
import Wrapper from '../Wrapper/Wrapper'

export interface Props {
	root: TreeNode
	pathsCount?: number
	pathsLimit?: number
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
			<Wrapper>
				<div className={css.text}>
					<div className={css.box}>
						<span className={css.title}>About this view: </span>
						<span>
							This graph shows the relationships between the dependencies in the project, which are
							related to the vulnerable dependency. Starting from the root on the left, it shows the
							paths to the vulnerable dependency highlighted in red.
						</span>
					</div>
					{props.pathsCount && props.pathsLimit && props.pathsCount > props.pathsLimit && (
						<div className={css.noteWrapper}>
							<span className={css.title}>Note: </span>
							<span>
								Graph size limit reached. The Impact Graph shows only {props.pathsLimit} out of{' '}
								{props.pathsCount.toLocaleString()} paths to this dependency.
							</span>
						</div>
					)}
				</div>
			</Wrapper>
			<Wrapper>
				<Header filter={filter} OnFilter={filterHandler} OnActiveNode={activeNodeHandler} />
				<div className={css.container}>
					<TreeViewer
						activeNode={activeNode}
						root={props.root}
						filter={filter}
						handleClick={activeNodeHandler}
					/>
				</div>
			</Wrapper>
		</>
	)
}
