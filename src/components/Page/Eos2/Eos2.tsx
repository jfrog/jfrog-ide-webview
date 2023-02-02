import css from './Eos2.module.css'
import Header from '../../UI/Header/Header'
import { IEos2Page } from '../../../model/Eos2Page'
import { ISeverity } from '../../../model/severity'

export interface Props {
  data: IEos2Page
}

function Eos2(props: Props) {
	return (
		<div className={css.Container}>
			<Header
				Severity={ISeverity.Unknown}
				text={props.data.header}
				isResearch={false}/>
		</div>
	)
}

export default Eos2