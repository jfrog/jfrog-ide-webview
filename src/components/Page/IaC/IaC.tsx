import Header from '../../UI/Header/Header'
import { IIaCPage } from '../../../model'
import InformationTabs, { TABS } from '../../UI/InformationTabs/InformationTabs'

export interface Props {
	data: IIaCPage
}

function IaC(props: Props): JSX.Element {
	return (
		<>
			<Header pageData={props.data} text={props.data.header} />
			<InformationTabs
				data={props.data}
				tabs={[TABS.WHAT_CAN_I_DO.key, TABS.MORE_INFORMATION.key]}
			/>
		</>
	)
}

export default IaC
