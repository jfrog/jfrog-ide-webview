import css from './Eos.module.css'
import Summary from '../../UI/Summary/Summary'
import Header from '../../UI/Header/Header'
import { IEos } from '../../../model/EosPage'
import { ISeverity } from '../../../model/severity'
import EosVulnerability from '../../UI/Summary/EosVulnerability'
import Navigator from './Navigator/Navigator'

export interface Props {
  data: IEos
}

function Eos(props: Props) {
	return (
		<div className={css.Container}>
			<Header
				Severity={ISeverity.Unknown}
				text={props.data.header}
				isResearch={false}/>
			<Summary expandButton={false}>
				<EosVulnerability location={`${props.data.location.file}:${props.data.location.row}`}/>
			</Summary>
			<Navigator data={props.data}/>
		</div>
	)
}

export default Eos