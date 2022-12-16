import { IDependencyPage } from '../../../../model/dependencyPage'
import CveVulnerability from './CveVulnerability'
import css from './Summary.module.css'
import { useState } from 'react'
import ExpandButton from '../../../UI/ExpandButton/ExpandButton'

export interface Props {
  data: IDependencyPage
}

const Summary = (props: Props) => {
	const [expanded, setExpanded] = useState(false)
	return (
		<div className={css.container}>
			<div className={css.details}>
				<ul className={expanded ? css.fullText : css.halfText}>
					<CveVulnerability
						data={props.data}/>
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