import Header from '../../UI/Header/Header'
import { ISecretsPage } from '../../../model'
import InformationTabs, { TABS } from '../../UI/InformationTabs/InformationTabs'
export interface Props {
	data: ISecretsPage
}

function Secrets(props: Props): JSX.Element {
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

export default Secrets
