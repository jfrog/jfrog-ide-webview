import css from './Dependency.module.css'
import Summary from '../../UI/Summary/Summary'
import Edited from '../../UI/Edited/Edited'
import Header from '../../UI/Header/Header'
import Navigator from './Navigator/Navigator'
import CveVulnerability from '../../UI/Summary/CveVulnerability'
import { IDependencyPage } from '../../../model/webviewPages'

export interface Props {
	data: IDependencyPage
}

export default function Dependency(props: Props): JSX.Element {
	return (
		<div className={css.Container}>
			<Header
				Severity={props.data.severity}
				text={props.data.cve?.id ? props.data.cve.id : props.data.id}
				isResearch={props.data.extendedInformation !== undefined}
			/>
			{props.data.extendedInformation && <Edited date={props.data.edited} />}
			<Summary expandButton>
				<CveVulnerability data={props.data} />
			</Summary>
			<Navigator data={props.data} />
		</div>
	)
}
