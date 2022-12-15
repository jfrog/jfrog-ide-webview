import ContextualAnalysis from './page/ContextualAnalysis'
import Reference from './page/Reference'
import Research from './page/Research'
import css from './Page.module.css'
import { IDependencyPage } from '../../../../model/dependencyPage'
import ImpactedPath from './page/ImpactedPath'
import PublicResources from './page/PublicResources'
import { useState, useEffect, useRef } from 'react'

interface Props {
  index: number
  DependencyData: IDependencyPage
}

const PageHolder = (props: Props) => {
	const ref = useRef<HTMLDivElement>(null)
	const [resize, setResize] = useState({ height: 0, width: 0 })
	useEffect(() =>	resizeHandler(), [])
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
			if (props.DependencyData.extendedInformation) {
				pageHolder = <Research data={props.DependencyData.extendedInformation}/>
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
				height={resize.height}
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