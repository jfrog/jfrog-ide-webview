import { IAnalysisStep } from '../../../model/EosPage'
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
					<div>
						{item.file}
					</div>
				</div>
				<div className={css.file}>
					{`${item.row}:${item.colum}`}
				</div>
			</li>))}
	</>
export default EosListElement