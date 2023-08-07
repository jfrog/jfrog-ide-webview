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

	const createSnippet = (snippet: string): string => {
		if (snippet.length > 30) {
			return `${snippet.substring(0, 100)}...`
		}

		return snippet
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
							{item.fileName}
							{item.startRow}:
						</div>
						<div className={css.snippet}>
							{item.snippet && <div>{createSnippet(item.snippet)}</div>}
						</div>
					</div>
				</button>
			))}
		</>
	)
}
