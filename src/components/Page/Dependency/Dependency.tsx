import css from './Dependency.module.css'
import Summary from './Summary/Summary'
import Edited from './Edited/Edited'
import Header from './Header/Header'
import Navigator from './Navigator/Navigator'
import { IDependencyPage } from '../../../model/dependencyPage'

export interface Props {
  data: IDependencyPage
}

function Dependency(props: Props) {
	return (
		<div className={css.Container}>
			<Header
				Severity={props.data.severity}
				text={props.data.cve?.id ? props.data.cve.id : props.data.id}
				isResearch={props.data.extendedInformation !== undefined}/>
			{props.data.extendedInformation && <Edited date={props.data.edited}/>}
			<Summary data={props.data}/>
			<Navigator data={props.data}/>
		</div>
	)
}

export default Dependency