import css from './Collapse.module.css'
import { useState } from 'react'
import ArrowUp from '../ArrowUp/ArrowUp'
import ArrowDown from '../ArrowDown/ArrowDown'

export interface Props {
	header: string
	text: string

}

const Collapse = (props: Props) => {
	const [collapse, setCollapse] = useState(false)
	const getStyle = () => {
		if (collapse) {
			const wrapper = document.getElementById('collapse-text')
			return { height: `${wrapper?.clientHeight}px` }
		} else {
			return { height: 0 }
		}
	}
	return (
		<>
			<div className={css.collapseHeader} onClick={() => setCollapse(prev => !prev)}>
				<span>{props.header}</span>
				{ collapse && <ArrowUp/> }
				{ !collapse && <ArrowDown/> }
			</div>
			<div style={getStyle()} className={css.collapseContent}>
				<div id="collapse-text" className={css.collapseText}>{props.text}</div>
			</div>
		</>
	)
}

export default Collapse