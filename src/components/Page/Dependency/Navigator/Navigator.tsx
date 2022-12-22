import { useState, useEffect } from 'react'
import { ICve } from '../../../../model/cve'
import { IDependencyPage } from '../../../../model/dependencyPage'
import { IExtendedInformation } from '../../../../model/extendedInformation'
import { IReference } from '../../../../model/reference'
import { ActiveTab } from '../../../../model/tab'
import PageHolder from './PageHolder'
import Tab from './Tab'

export interface Props {
  data: IDependencyPage
}

const Navigator = (props: Props) => {
	const [activeTab, setActiveTab] = useState<ActiveTab>(ActiveTab.None)
	const tabChangeHandler = (index: ActiveTab) => {
		setActiveTab(index)
	}
	const hideResearch = isJfrogResearchHidden(props.data.extendedInformation)
	const hideContextual = isContextualAnalysisHidden(props.data.cve)
	const hidePublicSources = isPublicResourcesHidden(props.data.cve)
	useEffect(() => {
		if (!hideResearch) {
			setActiveTab(ActiveTab.Research)
		} else if (!hideContextual) {
			setActiveTab(ActiveTab.ContextualAnalysis)
		} else if (!hidePublicSources) {
			setActiveTab(ActiveTab.PublicSources)
		} else {
			setActiveTab(ActiveTab.ImpactedPath)
		}
	}, [])
	return (
		<>
			<div>
				<Tab
					items={[
						{
							text: 'JFrog Research',
							hide: hideResearch,
							tabKey: ActiveTab.Research
						},
						{
							text: 'Contextual Analysis',
							hide: hideContextual,
							tabKey: ActiveTab.ContextualAnalysis
						},
						{ text: 'Public Sources', hide: hidePublicSources, tabKey: ActiveTab.PublicSources },
						{ text: 'Impact Path', hide: false, tabKey: ActiveTab.ImpactedPath },
						{
							text: 'References',
							hide: isReferenceHidden(props.data.references),
							tabKey: ActiveTab.Reference
						}
					]}
					onChangeMenu={tabChangeHandler}/>
			</div>
			<PageHolder activeTab={activeTab} data={props.data}/>
		</>
	)
}

const isJfrogResearchHidden = (researchData: IExtendedInformation | undefined): boolean => researchData === undefined

const isReferenceHidden = (references: IReference[] | undefined): boolean => references === undefined || references.length === 0

const isContextualAnalysisHidden = (cveData: ICve | undefined): boolean => cveData === undefined || cveData.applicableData === undefined || cveData.applicableData.isApplicable === false

const isPublicResourcesHidden = (cveData: ICve | undefined): boolean => cveData === undefined || (cveData.cvssV2Score === undefined && cveData.cvssV3Score === undefined)

export default Navigator