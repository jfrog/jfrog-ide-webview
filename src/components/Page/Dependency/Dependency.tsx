import Header from '../../UI/Header/Header'
import { IDependencyPage } from '../../../model'
import InformationTabs, { TABS } from '../../UI/InformationTabs/InformationTabs'
import ApplicabilityEvidence from './ApplicabilityEvidence'
export interface Props {
	data: IDependencyPage
}

export default function Dependency(props: Props): JSX.Element {
	const showApplicabilityEvidence =
		props.data.cve?.applicableData?.evidence ?? props.data.cve?.applicableData?.searchTarget
	return (
		<>
			<Header pageData={props.data} text={props.data.cve?.id ? props.data.cve.id : props.data.id} />
			{props.data.cve?.applicableData && showApplicabilityEvidence && (
				<ApplicabilityEvidence data={props.data.cve.applicableData} />
			)}
			<InformationTabs
				data={props.data}
				tabs={[TABS.WHAT_CAN_I_DO.key, TABS.CVE_INFORMATION.key, TABS.IMPACT_GRAPH.key]}
			/>
		</>
	)
}
