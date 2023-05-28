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
	const close = { height: '0px' }
	const [collapseStyle, setCollapseStyle] = useState(close)
	return (
		<>
			<div
				className={css.collapseHeaderWrapper}
				onClick={(): void => {
					setCollapseStyle(prev =>
						prev.height === '0px'
							? { height: `${document.getElementById(props.id)?.clientHeight}1px` }
							: close
					)
				}}
			>
				<span className={css.collapseHeader}>{props.header}</span>
				<ExpandButton isExpand={collapseStyle.height !== '0px'} />
			</div>
			<div style={collapseStyle} className={css.collapseContent}>
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
