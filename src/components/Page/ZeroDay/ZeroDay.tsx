import css from './ZeroDay.module.css'
import Summary from '../../UI/Summary/Summary'
import Header from '../../UI/Header/Header'
import { IZeroDayPage } from '../../../model/zeroDayPage'
import { ISeverity } from '../../../model/severity'
import ZeroDayVulnerability from '../../UI/Summary/ZeroDayVulnerability'
import Navigator from './Navigator/Navigator'

export interface Props {
  data: IZeroDayPage
}

function ZeroDay(props: Props) {
	return (
		<div className={css.Container}>
			<Header
				Severity={ISeverity.Unknown}
				text={props.data.header}
				isResearch={false}/>
			<Summary expandButton={false}>
				<ZeroDayVulnerability location={props.data.location}/>
			</Summary>
			<Navigator data={props.data}/>
		</div>
	)
}

export default ZeroDay