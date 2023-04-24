import css from './Collapse.module.css'
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import ExpandButton from '../ExpandButton/ExpandButton'

export interface Props {
	id: string
	header: string
	text: string
	markdown?: boolean
}

export function Collapse(props: Props): JSX.Element {
	const [collapse, setCollapse] = useState(false)
	const close = { height: 0 }
	const open = { height: `${document.getElementById(props.id)?.clientHeight}px` }
	return (
		<>
			<div
				className={css.collapseHeaderWrapper}
				onClick={(): void => {
					setCollapse(prev => !prev)
				}}
			>
				<span className={css.collapseHeader}>{props.header}</span>
				<ExpandButton isExpand={collapse} />
			</div>
			<div style={collapse ? close : open} className={css.collapseContent}>
				{props.markdown && (
					<div id={props.id} className={css.collapseText}>
						{' '}
						<ReactMarkdown className={css.markdownText}>{props.text}</ReactMarkdown>{' '}
					</div>
				)}
				{!props.markdown && (
					<div id={props.id} className={css.collapseText}>
						{props.text}
					</div>
				)}
			</div>
		</>
	)
}
