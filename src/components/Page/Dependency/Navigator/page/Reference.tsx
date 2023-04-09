import { IReference } from '../../../../../model/reference'
import css from './Reference.module.css'

export interface Props {
  data: IReference[]
}

const Reference = (props: Props): JSX.Element => (
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

export default Reference