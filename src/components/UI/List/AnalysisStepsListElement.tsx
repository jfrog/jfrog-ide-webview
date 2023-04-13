import { IAnalysisStep } from '../../../model/analysisStep'
import css from './AnalysisStepsListElement.module.css'
import CodeBlock from '../CodeBlock/CodeBlock'

interface Props {
	items: IAnalysisStep[]
}

export default function AnalysisStepsListElement(props: Props): JSX.Element {
	return (
		<>
			{props.items.map((item, i) => (
				<button key={i} className={css.container}>
					<div className={css.file}>
						<div className={css.number}>{i + 1}</div>
						<div className={css.row}>
							{' '}
							{item.fileName} {item.row}:{' '}
						</div>
						{item.snippet && <CodeBlock codeString={item.snippet} id={i.toString()} />}
					</div>
				</button>
			))}
		</>
	)
}
