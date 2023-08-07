import { IAnalysisStep } from '../../../model/analysisStep'
import css from './AnalysisStepsListElement.module.css'
import { useContext } from 'react'
import { eventManagerContext } from '../../../store/eventContext'

export interface Props {
	items: IAnalysisStep[]
}

export default function AnalysisStepsListElement(props: Props): JSX.Element {
	const ctx = useContext(eventManagerContext)

	const onClick = (event: React.MouseEvent<HTMLButtonElement>, item: IAnalysisStep): void => {
		event.preventDefault()
		ctx.jumpToCode(item)
	}

	const hideOverflowText = (text: string, max: number): string => {
		if (text.length > max) {
			return `${text.substring(0, max)}...`
		}

		return text
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
							{item.fileName && hideOverflowText(item.fileName, 30)}
							{item.startRow}:
						</div>
						<div className={css.snippet}>
							{item.snippet && <div>{hideOverflowText(item.snippet, 100)}</div>}
						</div>
					</div>
				</button>
			))}
		</>
	)
}
