import { IReference } from '../../../../../model/reference'
import css from './Reference.module.css'

export interface Props {
	data: IReference[]
}

export default function Reference(props: Props): JSX.Element {
	return (
		<div className={css.container}>
			{props.data.map((ref, i) => (
				<div key={i} className={css.innerContainer}>
					{ref.text && <h3>{ref.text}</h3>}
					<a href={ref.url}>{ref.url}</a>
					<div className={css.line}/>
				</div>
			))}
		</div>
	)
}