import { IAnalysisStep } from '../../../model/zeroDayPage'
import css from './ZeroDayListElement.module.css'
interface Props {
    items: IAnalysisStep[]
}

const ZeroDayListElement = (props: Props) =>
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
export default ZeroDayListElement