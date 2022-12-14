import css from './Dependency.module.css'
import Summary from './Summary/Summary'
import Edited from './Edited/Edited'
import Header from './Header/Header'
import Navigator from './Navigator/Navigator'
import { useState } from 'react'
import Context from '../../../store/Context'
import { IDependencyPage } from '../../../model/dependencyPage'

export interface Props {
  data: IDependencyPage
}

function Dependency(props: Props) {
	const [summaryExpanded, setSummaryExpanded] = useState<boolean>(false)
	return (
		<Context.Provider value={{ summaryExpanded: summaryExpanded }}>
			<div className={css.Container}>
				<Header
					Severity={props.data.severity}
					text={props.data.cve ? props.data.cve.id : props.data.id}
					isResearch={props.data.extendedInformation !== undefined}/>
				{props.data.extendedInformation && <Edited date={props.data.edited}/>}
				<Summary data={props.data} onSummaryExpanded={expanded => { setSummaryExpanded(expanded) }}/>
				<Navigator data={props.data}/>
			</div>
		</Context.Provider>
	)
}

export default Dependency