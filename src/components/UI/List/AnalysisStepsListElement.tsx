import { IAnalysisStep } from '../../../model/analysisStep'
import css from './AnalysisStepsListElement.module.css'
import { useContext } from 'react'
import { eventManagerContext } from '../../../store/eventContext'
import Markdown from '../Markdown/Markdown'

export interface Props {
	items: IAnalysisStep[]
}

export default function AnalysisStepsListElement(props: Props): JSX.Element {
	const ctx = useContext(eventManagerContext)

	const onClick = (event: React.MouseEvent<HTMLButtonElement>, item: IAnalysisStep): void => {
		event.preventDefault()
		ctx.jumpToCode(item)
	}

	return (
		<>
			{props.items.map((item, i) => (
				<button
					onClick={(event): void => {
						onClick(event, item)
					}}
					key={i}
					className={css.container}
				>
					<div className={css.file} id={i.toString()}>
						<div className={css.number}>{i + 1}</div>
						<div className={css.row}>
							{' '}
							{item.fileName} {item.startRow}:{' '}
						</div>
						{item.snippet && <Markdown text={item.snippet} />}
					</div>
				</button>
			))}
		</>
	)
}
