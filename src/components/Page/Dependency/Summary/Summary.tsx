import { IDependencyPage } from '../../../../model/dependencyPage'
import CveVulnerability from './CveVulnerability'
import css from './Summary.module.css'
import { useState, useRef, useEffect } from 'react'
import ExpandButton from '../../../UI/ExpandButton/ExpandButton'

export interface Props {
  data: IDependencyPage
  onSummaryExpanded: (a: boolean) => void
}

const Summary = (props: Props) => {
	const [expanded, setExpanded] = useState(false)
	const ref = useRef<HTMLDivElement>(null)
	useEffect(() => {
		setTimeout(() => {
			props.onSummaryExpanded(expanded)
		  }, 700)
	}, [expanded])
	return (
		<div className={css.container} ref={ref}>
			<div className={css.details}>
				<ul className={expanded ? css.fullText : css.halfText}>
					<CveVulnerability
						id={props.data.id}
						type={props.data.type}
						dependencyName={props.data.name}
						dependencyVersion={props.data.version}
						severity={props.data.severity}
						fixedVersion={props.data.fixedVersion}
						license={props.data.license}
						cve={props.data.cve}
						jfrogSeverity={props.data.researchInfo?.jfrogResearchSeverity}/>
				</ul>
			</div>
			<label
				onClick={() => {
					setExpanded(prev => !prev)
				}}>
				<ExpandButton isExpand={expanded}/>
			</label>
		</div>
	)
}

export default Summary