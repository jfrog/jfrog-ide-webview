import css from './Eos.module.css'
import Summary from '../../UI/Summary/Summary'
import Header from '../../UI/Header/Header'
import { IEosPage } from '../../../model/EosPage'
import { ISeverity } from '../../../model/severity'
import Vulnerability from '../../UI/Summary/Vulnerability'
import VulnerabilityLine from '../../UI/Summary/VulnerabilityLine'
import Research from './Research'
import ContextualAnalysis from './ContextualAnalysis'
import Severity from '../../UI/Summary/Severity'

export interface Props {
  data: IEosPage
}

function Eos(props: Props): JSX.Element {
	return (
		<div className={css.Container}>
			<Header
				Severity={props.data.severity ? props.data.severity : ISeverity.Unknown}
				text={props.data.header}
				isResearch={false}/>
			<Summary expandButton={false}>
				<Vulnerability location={`${props.data.location.file}`}/>
				<Severity severity={props.data.severity ? props.data.severity : ISeverity.Unknown}/>
				<VulnerabilityLine line={`${props.data.location.row}`}/>

			</Summary>
			<Research description={props.data.description} remediation={props.data.remediation}/>
			<ContextualAnalysis foundText={props.data.foundText} analysisSteps={props.data.analysisStep}/>
		</div>
	)
}

export default Eos