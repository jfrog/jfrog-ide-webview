import css from './IaC.module.css'
import Header from '../../UI/Header/Header'
import { IIaCPage } from '../../../model/IaCPage'
import Summary from '../../UI/Summary/Summary'
import Severity from '../../UI/Summary/Severity'
import { ISeverity } from '../../../model/severity'
import Vulnerability from '../../UI/Summary/Vulnerability'
import VulnerabilityLine from '../../UI/Summary/VulnerabilityLine'
import Description from './Description'
import Abbreviation from '../../UI/Summary/Abbreviation'
import Findings from './Findings'

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
			<Summary showAll expandButton={false}>
				<Vulnerability location={`${props.data.location.file}`}/>
				<Severity severity={props.data.severity ? props.data.severity : ISeverity.Unknown}/>
				<VulnerabilityLine line={`${props.data.location.row}`}/>
				<Abbreviation abbreviation={props.data.abbreviation ? props.data.abbreviation : ''}/>
			</Summary>
			<Description description={props.data.description}/>
			<Findings snippet={props.data.finding?.snippet} happen={props.data.finding?.happen} meaning={props.data.finding?.meaning} do={props.data.finding?.do}/>
		</div>
	)
}

export default IaC