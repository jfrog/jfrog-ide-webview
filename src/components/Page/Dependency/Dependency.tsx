import css from './Dependency.module.css'
import Header from '../../UI/Header/Header'
import { IDependencyPage } from '../../../model'
import InformationTabs, { TABS } from '../../UI/InformationTabs/InformationTabs'
export interface Props {
	data: IDependencyPage
}

export default function Dependency(props: Props): JSX.Element {
	return (
		<div className={css.PageContainer}>
			<Header pageData={props.data} text={props.data.cve?.id ? props.data.cve.id : props.data.id} />
			<InformationTabs
				data={props.data}
				tabs={[
					TABS.WHAT_CAN_I_DO.key,
					TABS.CVE_INFORMATION.key,
					TABS.IMPACT_GRAPH.key,
					TABS.CONTEXTUAL_ANALYSIS.key
				]}
			/>
		</div>
	)
}
