import ContextualAnalysis from './page/ContextualAnalysis'
import Reference from './page/Reference'
import Research from './page/Research'
import css from './Page.module.css'
import { IDependencyPage } from '../../../../model/dependencyPage'
import ImpactGraph from './page/ImpactGraph'
import PublicSources from './page/PublicSources'
import { useState, useEffect } from 'react'
import { ActiveTab } from '../../../../model/tab'
import { TreeNode } from '../../../../model/treeNode'
import { toTreeNode } from '../../../../utils/utils'

interface Props {
	activeTab: ActiveTab
	data: IDependencyPage
}

/**
 * Renders a page to the corresponding tab button.
 */
export default function PageHolder(props: Props): JSX.Element {
	const [treeNode, setTreeNode] = useState<TreeNode>({} as TreeNode)
	useEffect(() =>	{
		setTreeNode(toTreeNode(props.data.impactGraph))
	}, [props.data.impactGraph])

	let pageHolder
	switch (props.activeTab) {
		case ActiveTab.Research:
			if (props.data.extendedInformation) {
				pageHolder = (
					<Research data={props.data.extendedInformation}/>)
			}

			break
		case ActiveTab.ContextualAnalysis:
			if (props.data.cve?.applicableData) {
				pageHolder = <ContextualAnalysis data={props.data.cve.applicableData}/>
			}

			break
		case ActiveTab.PublicSources:
			pageHolder = (
				<PublicSources
					summary={props.data.summary}
					cve={props.data.cve}
					infectedVersions={props.data.infectedVersion}/>
			)
			break
		case ActiveTab.ImpactGraph:
			pageHolder = (<ImpactGraph
				treeNode={treeNode}/>)
			break
		case ActiveTab.Reference:
			if (props.data.references) {
				pageHolder = <Reference data={props.data.references}/>
			}
	}

	return (
		<div key={props.data.id + props.data.component} className={css.container}>{pageHolder}</div>
	)
}