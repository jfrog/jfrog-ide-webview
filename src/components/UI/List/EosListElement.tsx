import { IAnalysisStep } from '../../../model/analysisStep'
import css from './EosListElement.module.css'
interface Props {
    items: IAnalysisStep[]
}

const EosListElement = (props: Props) =>
	<>
		{props.items.map((item, i) => (
			<li key={i} className={css.container}>
				<div className={css.file}>
					<div className={css.number}>
						{i + 1}
					</div>
					<div className={css.row}> {item.row}: </div>
					<div className={css.snippet}>
						{item.snippet}
					</div>
				</div>
				{/* <div className={css.file}>*/}
				{/*	{`${item.row}:${item.colum}`}*/}
				{/* </div>*/}
			</li>))}
	</>
export default EosListElement