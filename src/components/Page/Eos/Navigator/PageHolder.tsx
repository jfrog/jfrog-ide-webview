import ContextualAnalysis from './page/ContextualAnalysis'
import Research from './page/Research'
import css from './Page.module.css'
import { ActiveTab } from '../../../../model/tab'
import { IEosPage } from '../../../../model'

interface Props {
  activeTab: ActiveTab
  data: IEosPage
}

const PageHolder = (props: Props) => {
	let pageHolder = <></>
	switch (props.activeTab) {
		case ActiveTab.Research:
			pageHolder = (
				<>
					<Research description={props.data.description} remediation={props.data.remediation}/>
				</>)

			break
		case ActiveTab.ContextualAnalysis:
			pageHolder = <ContextualAnalysis foundText={props.data.foundText} analysisSteps={props.data.analysisStep}/>
			break
	}
	return (
		<>
			<div className={css.container}>{pageHolder}</div>
		</>
	)
}

export default PageHolder