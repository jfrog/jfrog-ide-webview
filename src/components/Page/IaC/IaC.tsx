import css from './IaC.module.css'
import Header from '../../UI/Header/Header'
import { IIaCPage } from '../../../model/IaCPage'
import Summary from '../../UI/Summary/Summary'

export interface Props {
  data: IIaCPage
}

function IaC(props: Props) {
	return (
		<div className={css.Container}>
			<Header
				Severity={props.data.severity}
				text={props.data.header}
				isResearch={false}/>
			<Summary expandButton={false}>
				<div>NATI</div>
			</Summary>
		</div>
	)
}

export default IaC