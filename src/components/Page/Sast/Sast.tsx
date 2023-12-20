import css from './Sast.module.css'
import Header from '../../UI/Header/Header'
import ContextualAnalysis from './ContextualAnalysis'
import { ISastPage } from '../../../model'
import InformationTabs, { TABS } from '../../UI/InformationTabs/InformationTabs'

export interface Props {
	data: ISastPage
}

export default function Sast(props: Props): JSX.Element {
	return (
		<div className={css.PageContainer}>
			<Header pageData={props.data} text={props.data.header} />
			<ContextualAnalysis analysisSteps={props.data.analysisStep} />
			<InformationTabs
				data={props.data}
				tabs={[TABS.WHAT_CAN_I_DO.key, TABS.MORE_INFORMATION.key]}
			/>
		</div>
	)
}
