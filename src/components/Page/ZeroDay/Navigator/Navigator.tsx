import { useState } from 'react'
import { IZeroDayPage } from '../../../../model/zeroDayPage'
import { ActiveTab } from '../../../../model/tab'
import PageHolder from './PageHolder'
import Tab from './Tab'

export interface Props {
  data: IZeroDayPage
}

const Navigator = (props: Props) => {
	const [activeTab, setActiveTab] = useState<ActiveTab>(ActiveTab.None)
	const tabChangeHandler = (index: ActiveTab) => {
		setActiveTab(index)
	}

	return (
		<>
			<div>
				<Tab
					items={[{
						text: 'JFrog Research',
						hide: isJfrogResearchHidden(props.data),
						tabKey: ActiveTab.Research
					}, {
						text: 'Contextual Analysis',
						hide: false,
						tabKey: ActiveTab.ContextualAnalysis
					}]}
					onChangeMenu={tabChangeHandler}/>
			</div>
			<PageHolder activeTab={activeTab} data={props.data}/>
		</>
	)
}

const isJfrogResearchHidden = (researchData: IZeroDayPage): boolean => researchData.remediation?.length === 0 && researchData.description === undefined

export default Navigator