import css from './Secrets.module.css'
import Header from '../../UI/Header/Header'
import { ISecretsPage } from '../../../model/webviewPages'
import InformationTabs, { TABS } from '../../UI/InformationTabs/InformationTabs'
export interface Props {
	data: ISecretsPage
}

function Secrets(props: Props): JSX.Element {
	return (
		<div className={css.Container}>
			<Header pageData={props.data} text={props.data.header} />
			<InformationTabs
				data={props.data}
				tabs={[TABS.WHAT_CAN_I_DO.key, TABS.MORE_INFORMATION.key]}
			/>
		</div>
	)
}

export default Secrets
