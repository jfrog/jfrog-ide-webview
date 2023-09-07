import css from './Iac.module.css'
import Header from '../../UI/Header/Header'
import { IIaCPage } from '../../../model'
import InformationTabs, { TABS } from '../../UI/InformationTabs/InformationTabs'

export interface Props {
	data: IIaCPage
}

function IaC(props: Props): JSX.Element {
	return (
		<div className={css.PageContainer}>
			<Header pageData={props.data} text={props.data.header} />
			<InformationTabs
				data={props.data}
				tabs={[TABS.WHAT_CAN_I_DO.key, TABS.MORE_INFORMATION.key]}
			/>
		</div>
	)
}

export default IaC
