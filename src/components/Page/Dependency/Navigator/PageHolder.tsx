import ContextualAnalysis from './page/ContextualAnalysis'
import Reference from './page/Reference'
import Research from './page/Research'
import css from './Page.module.css'
import { IDependencyPage } from '../../../../model/dependencyPage'
import ImpactedPath from './page/ImpactedPath'
import PublicResources from './page/PublicResources'
import context from './../../../../store/Context'
import { useState, useEffect, useContext, useRef } from 'react'

interface Props {
  index: number
  DependencyData: IDependencyPage
}

const PageHolder = (props: Props) => {
	const ref = useRef<HTMLDivElement>(null)
	const ctx = useContext(context)
	const [resize, setResize] = useState({ height: 0, width: 0 })
	useEffect(() =>	resizeHandler(), [props.index, ctx.summaryExpanded])
	window.onresize = () =>	resizeHandler()
	const resizeHandler = () => {
		console.log(ref.current?.clientHeight)
		setResize({
			height: ref.current?.clientHeight || 0,
			width: ref.current?.clientWidth || 0
		})
	}
	let pageHolder = <></>
	switch (props.index) {
		case 0:
			if (props.DependencyData.researchInfo) {
				pageHolder = <Research data={props.DependencyData.researchInfo}/>
			}
			break
		case 1:
			pageHolder = <ContextualAnalysis/>
			break
		case 2:
			pageHolder = (
				<PublicResources
					summary={props.DependencyData.summary}
					cve={props.DependencyData.cve}
					infectedVersions={props.DependencyData.infectedVersion}/>
			)
			break
		case 3:
			pageHolder = <ImpactedPath
				height={resize.height * 0.85}
				width={resize.width}
				impactedPath={props.DependencyData.impactedPath}/>
			break
		case 4:
			if (props.DependencyData.references) {
				pageHolder = <Reference data={props.DependencyData.references}/>
			}
	}
	return (
		<>
			<div className={css.container} ref={ref}>{pageHolder}</div>
		</>
	)
}

export default PageHolder