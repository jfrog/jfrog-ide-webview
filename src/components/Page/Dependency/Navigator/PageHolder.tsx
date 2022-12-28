import ContextualAnalysis from './page/ContextualAnalysis'
import Reference from './page/Reference'
import Research from './page/Research'
import css from './Page.module.css'
import { IDependencyPage } from '../../../../model/dependencyPage'
import ImpactedPath from './page/ImpactedPath'
import PublicSources from './page/PublicSources'
import { useState, useEffect, useRef } from 'react'
import { ActiveTab } from '../../../../model/tab'
import { TreeNode } from '../../../../model/treeNode'
import { toTreeNode } from '../../../../utils/utils'

interface Props {
  activeTab: ActiveTab
  data: IDependencyPage
}

const PageHolder = (props: Props) => {
	const ref = useRef<HTMLDivElement>(null)
	let specialClassName: string | undefined
	const [resize, setResize] = useState({ height: 0, width: 0 })
	const [treeNode, setTreeNode] = useState<TreeNode>({} as TreeNode)
	const resizeHandler = () => {
		setResize({
			height: ref.current?.clientHeight || 0,
			width: ref.current?.clientWidth || 0
		})
	}

	useEffect(() =>	{
		resizeHandler()
		setTreeNode(toTreeNode(props.data.impactedPath))
	}, [props.data.impactedPath])
	window.onresize = () =>	resizeHandler()

	let pageHolder = <></>
	switch (props.activeTab) {
		case ActiveTab.Research:
			if (props.data.extendedInformation) {
				pageHolder = (
					<>
						<Research data={props.data.extendedInformation}/>
					</>)
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
		case ActiveTab.ImpactedPath:
			pageHolder = <ImpactedPath
				height={resize.height}
				width={resize.width}
				treeNode={treeNode}/>
			specialClassName = css.impactedPathContainer
			break
		case ActiveTab.Reference:
			if (props.data.references) {
				pageHolder = <Reference data={props.data.references}/>
			}
	}
	return (
		<>
			<div key={props.data.id + props.data.component} className={specialClassName || css.container} ref={ref}>{pageHolder}</div>
		</>
	)
}

export default PageHolder