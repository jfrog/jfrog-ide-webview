import { useState, useEffect } from 'react'
import { IEosPage } from '../../../../model/EosPage'
import { ActiveTab, ITab } from '../../../../model/tab'
import PageHolder from './PageHolder'
import Tab from './Tab'

export interface Props {
  data: IEosPage
}

const Navigator = (props: Props) => {
	const tabs:ITab[] = createTabs(props)
	const defaultTab = tabs.find(tab => !tab.hide)?.tabKey || ActiveTab.None
	const [activeTab, setActiveTab] = useState<ActiveTab>(defaultTab)
	const tabChangeHandler = (index: ActiveTab) => {
		setActiveTab(index)
	}
	return (
		<>
			<div>
				<Tab
					items={tabs}
					activeTab={activeTab}
					onChangeMenu={tabChangeHandler}/>
			</div>
			<PageHolder activeTab={activeTab} data={props.data}/>
		</>
	)
}

const IsJfrogResearchHidden = (researchData: IEosPage): boolean => researchData.remediation?.length === 0 && researchData.description === undefined

const createTabs = (props: Props):ITab[] => [{
	text: 'JFrog Research',
	hide: IsJfrogResearchHidden(props.data),
	tabKey: ActiveTab.Research
}, {
	text: 'Contextual Analysis',
	hide: false,
	tabKey: ActiveTab.ContextualAnalysis
}]
export default Navigator