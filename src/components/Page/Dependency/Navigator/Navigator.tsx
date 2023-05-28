import { useState } from 'react'
import { IExtendedInformation } from '../../../../model/extendedInformation'
import { IReference } from '../../../../model/reference'
import { ActiveTab, ITab } from '../../../../model/tab'
import PageHolder from './PageHolder'
import Tab from './Tab'
import { IDependencyPage } from '../../../../model/webviewPages'

export interface Props {
	data: IDependencyPage
}

/**
 * Render the tabs section on the webview page and the content of the selected tab page.
 */
export default function Navigator(props: Props): JSX.Element {
	const tabs: ITab[] = createTabs(props)
	const defaultTab = tabs.find(tab => !tab.hide)?.tabKey ?? ActiveTab.None
	const [activeTab, setActiveTab] = useState<ActiveTab>(defaultTab)

	const tabChangeHandler = (index: ActiveTab): void => {
		setActiveTab(index)
	}

	return (
		<>
			<div>
				<Tab tabs={tabs} activeTab={activeTab} onChangeMenu={tabChangeHandler} />
			</div>
			<PageHolder activeTab={activeTab} data={props.data} />
		</>
	)
}

const isJFrogResearchHidden = (researchData: IExtendedInformation | undefined): boolean =>
	researchData === undefined

const isReferenceHidden = (references: IReference[] | undefined): boolean =>
	references == undefined || references.length === 0

const isContextualAnalysisHidden = (isApplicable: boolean | undefined): boolean =>
	isApplicable === undefined || !isApplicable

const isPublicResourcesHidden = (data: IDependencyPage): boolean =>
	!data.cve?.cvssV2Score && !data.cve?.cvssV3Score && !data.summary && !data.infectedVersion

const createTabs = (props: Props): ITab[] => [
	{
		text: 'JFrog Research',
		hide: isJFrogResearchHidden(props.data.extendedInformation),
		tabKey: ActiveTab.Research
	},
	{
		text: 'Contextual Analysis',
		hide: isContextualAnalysisHidden(props.data.cve?.applicableData?.isApplicable),
		tabKey: ActiveTab.ContextualAnalysis
	},
	{
		text: 'Public Sources',
		hide: isPublicResourcesHidden(props.data),
		tabKey: ActiveTab.PublicSources
	},
	{ text: 'Impact Graph', hide: false, tabKey: ActiveTab.ImpactGraph },
	{
		text: 'References',
		hide: isReferenceHidden(props.data.references),
		tabKey: ActiveTab.Reference
	}
]
