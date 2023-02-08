import css from './Collapse.module.css'
import { useState } from 'react'
import ArrowUp from '../ArrowUp/ArrowUp'
import ArrowDown from '../ArrowDown/ArrowDown'

export interface Props {
	header: string
	text: string

}

const Collapse = (props: Props) => {
	const [collapse, setCollapse] = useState(true)
	const getStyle = () => {
		if (collapse) {
			const wrapper = document.getElementById('collapse-text')
			return { height: `${wrapper?.clientHeight}px` }
		}
		return { height: 0 }
	}
	return (
		<>
			<div className={css.collapseHeaderWrapper} onClick={() => setCollapse(prev => !prev)}>
				<span className={css.collapseHeader}>{props.header}</span>
				{ !collapse ? <ArrowDown/> : <ArrowDown/> }
			</div>
			<div style={getStyle()} className={css.collapseContent}>
				<div id="collapse-text" className={css.collapseText}>{props.text}</div>
			</div>
		</>
	)
}

export default Collapse