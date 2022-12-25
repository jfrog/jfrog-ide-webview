import css from './Summary.module.css'
import { useState } from 'react'
import ExpandButton from './../../UI/ExpandButton/ExpandButton'

export interface Props {
	children: React.ReactNode
	expandButton: boolean
}

const Summary = (props: Props) => {
	const [expanded, setExpanded] = useState(false)
	return (
		<div className={css.container}>
			<div className={css.details}>
				<ul className={expanded ? css.fullText : css.halfText}>
					{props.children}
				</ul>
			</div>
			{props.expandButton
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