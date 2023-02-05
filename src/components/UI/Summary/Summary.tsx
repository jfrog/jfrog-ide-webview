import css from './Summary.module.css'
import { useState } from 'react'
import ExpandButton from './../../UI/ExpandButton/ExpandButton'

export interface Props {
	children: React.ReactNode
	expandButton: boolean
	showAll ?: boolean
}

const Summary = (props: Props) => {
	const [expanded, setExpanded] = useState(false)
	return (
		<div className={css.container}>
			<div className={css.details}>
				<ul className={expanded || props.showAll ? css.fullText : css.halfText}>
					{props.children}
				</ul>
			</div>
			{props.expandButton && !props.showAll
			&& <>
				<label onClick={() => setExpanded(prev => !prev)}>
					<ExpandButton isExpand={expanded}/>
				</label>
			   </>
			}
		</div>
	)
}

export default Summary