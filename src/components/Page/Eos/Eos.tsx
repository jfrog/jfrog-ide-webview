import css from './Eos.module.css'
import Summary from '../../UI/Summary/Summary'
import Header from '../../UI/Header/Header'
import { IEosPage } from '../../../model/EosPage'
import { ISeverity } from '../../../model/severity'
import EosVulnerability from '../../UI/Summary/EosVulnerability'
import EosVulnerabilityLine from '../../UI/Summary/EosVulnerabilityLine'
import Research from './Research'
import ContextualAnalysis from './ContextualAnalysis'
import EosSeverity from '../../UI/Summary/EosSeverity'

export interface Props {
  data: IEosPage
}

function Eos(props: Props) {
	return (
		<div className={css.Container}>
			<Header
				Severity={props.data.severity ? props.data.severity : ISeverity.Unknown}
				text={props.data.header}
				isResearch={false}/>
			<Summary expandButton={false}>
				<EosVulnerability location={`${props.data.location.file}`}/>
				<EosSeverity severity={props.data.severity ? props.data.severity : ISeverity.Unknown}/>
				<EosVulnerabilityLine line={`${props.data.location.row}`}/>

			</Summary>
			<Research description={props.data.description} remediation={props.data.remediation}/>
			<ContextualAnalysis foundText={props.data.foundText} analysisSteps={props.data.analysisStep}/>
		</div>
	)
}

export default Eos