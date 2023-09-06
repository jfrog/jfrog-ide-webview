import LayoutCss from '../../../styles/Layout.module.css'
import Header from '../../UI/Header/Header'
import ContextualAnalysis from './ContextualAnalysis'
import { IEosPage } from '../../../model/webviewPages'
import InformationTabs, { TABS } from '../../UI/InformationTabs/InformationTabs'

export interface Props {
	data: IEosPage
}

export default function Eos(props: Props): JSX.Element {
	return (
		<>
			<Header pageData={props.data} text={props.data.header} />
			<ContextualAnalysis analysisSteps={props.data.analysisStep} />
			<InformationTabs
				data={props.data}
				tabs={[TABS.WHAT_CAN_I_DO.key, TABS.MORE_INFORMATION.key]}
			/>
		</>
	)
}
