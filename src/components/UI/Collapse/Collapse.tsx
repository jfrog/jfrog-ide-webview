import css from './Collapse.module.css'
import { useState } from 'react'
import ArrowUp from '../ArrowUp/ArrowUp'
import ArrowDown from '../ArrowDown/ArrowDown'

export interface Props {
	id: string
	header: string
	text: string
}

export default function Collapse(props: Props): JSX.Element {
	const [collapse, setCollapse] = useState(true)
	const getStyle = (): {height: string;} | {height: number;} => {
		if (collapse) {
			const wrapper = document.getElementById(props.id)
			return { height: `${wrapper?.clientHeight}px` }
		}

		return { height: 0 }
	}

	return (
		<>
			<div className={css.collapseHeaderWrapper} onClick={(): void => { setCollapse(prev => !prev) }}>
				<span className={css.collapseHeader}>{props.header}</span>
				{ collapse ? <ArrowUp/> : <ArrowDown/> }
			</div>
			<div style={getStyle()} className={css.collapseContent}>
				<div id={props.id} className={css.collapseText}>{props.text}</div>
			</div>
		</>
	)
}