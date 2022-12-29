import { useState, useEffect } from 'react'
import { IDependencyPage } from '../../../../model/dependencyPage'
import { IExtendedInformation } from '../../../../model/extendedInformation'
import { IReference } from '../../../../model/reference'
import { ActiveTab, ITab } from '../../../../model/tab'
import PageHolder from './PageHolder'
import Tab from './Tab'

export interface Props {
  data: IDependencyPage
}

const Navigator = (props: Props) => {
	const tabs:ITab[] = createTabs(props)
	const defaultTab = tabs.find(tab => !tab.hide)?.tabKey || ActiveTab.None
	const [activeTab, setActiveTab] = useState<ActiveTab>(defaultTab)
	const tabChangeHandler = (index: ActiveTab) => {
		setActiveTab(index)
	}
	useEffect(() => {
		setActiveTab(tabs.find(tab => !tab.hide)?.tabKey || ActiveTab.None)
	}, [props.data.id])
	return (
		<>
			<div>
				<Tab
					tabs={tabs}
					activeTab={activeTab}
					onChangeMenu={tabChangeHandler}/>
			</div>
			<PageHolder activeTab={activeTab} data={props.data}/>
		</>
	)
}

const isJfrogResearchHidden = (researchData: IExtendedInformation | undefined): boolean => researchData === undefined

const isReferenceHidden = (references: IReference[] | undefined): boolean => !!(references?.length === 0)

const isContextualAnalysisHidden = (isApplicable: boolean | undefined): boolean => isApplicable === undefined || isApplicable === false

const isPublicResourcesHidden = (data: IDependencyPage): boolean => !data.cve?.cvssV2Score && !data.cve?.cvssV3Score && !data.summary && !data.infectedVersion

const createTabs = (props: Props):ITab[] => [
	{
		text: 'JFrog Research',
		hide: isJfrogResearchHidden(props.data.extendedInformation),
		tabKey: ActiveTab.Research
	},
	{
		text: 'Contextual Analysis',
		hide: isContextualAnalysisHidden(props.data.cve?.applicableData?.isApplicable),
		tabKey: ActiveTab.ContextualAnalysis
	},
	{ text: 'Public Sources', hide: isPublicResourcesHidden(props.data), tabKey: ActiveTab.PublicSources },
	{ text: 'Impact Path', hide: false, tabKey: ActiveTab.ImpactedPath },
	{
		text: 'References',
		hide: isReferenceHidden(props.data.references),
		tabKey: ActiveTab.Reference
	}
]
export default Navigator