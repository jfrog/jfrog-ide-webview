import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import React, { useEffect, useState } from 'react'
import { Collapse } from '../Collapse/Collapse'
import css from './InformationTabs.module.css'
import { ReactComponent as DocumentSvg } from '../../../assets/icons/document.svg'
import { ReactComponent as JfrogResearchIcon } from '../../../assets/icons/jfrog_research_icon.svg'
import { ReactComponent as InfoIcon } from '../../../assets/icons/info.svg'
import { ReactComponent as ReferenceIcon } from '../../../assets/icons/refrence.svg'
import {
	IDependencyPage,
	ISastPage,
	IIaCPage,
	IReference,
	ISecretsPage,
	PageType
} from '../../../model'
import PublicSources from '../../Page/Dependency/Navigator/page/PublicSources'
import Research from '../../Page/Dependency/Navigator/page/Research'
import Reference from '../../Page/Dependency/Navigator/page/Reference'
import ImpactGraph from '../../Page/Dependency/Navigator/page/ImpactGraph'
import { TreeNode } from '../../../model/treeNode'
import { toTreeNode } from '../../../utils/utils'
import WhatCanIDoTab from './WhatCanIDoTab'
import Markdown from '../Markdown/Markdown'
import ApplicabilityEvidence from './ApplicabilityEvidence'

export const TABS = {
	WHAT_CAN_I_DO: {
		label: 'What Can I Do',
		key: 'what_can_i_do'
	},
	MORE_INFORMATION: {
		label: 'More Information',
		key: 'more_information'
	},
	CVE_INFORMATION: {
		label: 'CVE Information',
		key: 'cve_information'
	},
	IMPACT_GRAPH: {
		label: 'Impact Graph',
		key: 'impact_graph'
	},
	CONTEXTUAL_ANALYSIS: {
		label: 'Contextual Analysis',
		key: 'contextual_analysis'
	}
}
export const LABELS = {
	DESCRIPTION: 'Description'
}

export interface Props {
	data: ISecretsPage | IDependencyPage | ISastPage | IIaCPage
	tabs: string[]
}

interface TabPanelProps {
	children?: React.ReactNode
	index: string
	value: string
}

function CustomTabPanel(props: TabPanelProps): JSX.Element {
	return (
		<div
			role="tabpanel"
			hidden={props.value !== props.index}
			id={`simple-tabpanel-${props.index}`}
			aria-labelledby={`simple-tab-${props.index}`}
		>
			{props.value === props.index && props.children}
		</div>
	)
}

function InformationTabs(props: Props): JSX.Element {
	const defaultTab = props.tabs[0]
	const [selectedTabIndex, setSelectedTabIndex] = React.useState(defaultTab)
	const [treeNode, setTreeNode] = useState<TreeNode | undefined>()
	const impactGraph = (props.data as IDependencyPage).impactGraph
	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (impactGraph) {
			setTreeNode(toTreeNode(impactGraph.root))
		}
	}, [impactGraph])

	const handleChange = (event: React.SyntheticEvent, newValue: string): void => {
		setSelectedTabIndex(newValue)
	}

	function tabClass(tab: string): string {
		return selectedTabIndex === tab ? css.activeTab : css.defaultTab
	}

	const showWhatCanIDoTab = props.tabs.includes(TABS.WHAT_CAN_I_DO.key)
	const showCveInformationTab = props.tabs.includes(TABS.CVE_INFORMATION.key)
	const showImpactGraphTab = props.tabs.includes(TABS.IMPACT_GRAPH.key)
	let remediation: string[] | undefined
	const extendedInformation = (props.data as IDependencyPage).extendedInformation

	switch (props.data.pageType) {
		case PageType.Sast:
			remediation = (props.data as ISastPage).remediation

			if (!remediation) {
				const content = (props.data as ISastPage).description
				const descriptionSplit = content?.split('### Remediation')

				if (descriptionSplit && descriptionSplit.length > 1) {
					remediation = [descriptionSplit[1] as string]
				}
			}

			break

		case PageType.Dependency:
			if (!!extendedInformation && extendedInformation.remediation) {
				remediation = [extendedInformation.remediation]
			}

			break
	}

	// set default patch the code text in no remediation
	if (!remediation) {
		switch (props.data.pageType) {
			case PageType.Sast:
			case PageType.IaC:
				remediation = [
					"Read about the vulnerability in the 'More information' tab and change the code accordingly"
				]
				break
			case PageType.Secrets:
				remediation = [
					"Consider using best practice approach to remove the secret from the code. Please reference the 'More Information' Section for further details"
				]
				break
		}
	}

	const showMoreInformationTab =
		props.tabs.includes(TABS.MORE_INFORMATION.key) && (props.data as ISastPage).description
	const pageTypeDependency = props.data as IDependencyPage
	const showApplicabilityEvidence =
		pageTypeDependency.cve?.applicableData?.evidence ??
		pageTypeDependency.cve?.applicableData?.searchTarget
	const showContextualAnalysisTab =
		showApplicabilityEvidence && props.tabs.includes(TABS.CONTEXTUAL_ANALYSIS.key)

	return (
		<div className={css.tabsContainer}>
			<Tabs
				className={css.borderBottom}
				TabIndicatorProps={{ className: css.chosenTab }}
				value={selectedTabIndex}
				onChange={handleChange}
			>
				{showWhatCanIDoTab && (
					<Tab
						className={tabClass(TABS.WHAT_CAN_I_DO.key)}
						value={TABS.WHAT_CAN_I_DO.key}
						label={TABS.WHAT_CAN_I_DO.label}
					/>
				)}
				{showContextualAnalysisTab && (
					<Tab
						className={tabClass(TABS.CONTEXTUAL_ANALYSIS.key)}
						value={TABS.CONTEXTUAL_ANALYSIS.key}
						label={TABS.CONTEXTUAL_ANALYSIS.label}
					/>
				)}
				{showCveInformationTab && (
					<Tab
						className={tabClass(TABS.CVE_INFORMATION.key)}
						value={TABS.CVE_INFORMATION.key}
						label={TABS.CVE_INFORMATION.label}
					/>
				)}
				{showImpactGraphTab && (
					<Tab
						className={tabClass(TABS.IMPACT_GRAPH.key)}
						value={TABS.IMPACT_GRAPH.key}
						label={TABS.IMPACT_GRAPH.label}
					/>
				)}
				{showMoreInformationTab && (
					<Tab
						className={tabClass(TABS.MORE_INFORMATION.key)}
						value={TABS.MORE_INFORMATION.key}
						label={TABS.MORE_INFORMATION.label}
					/>
				)}
			</Tabs>
			{showWhatCanIDoTab && (
				<CustomTabPanel value={selectedTabIndex} index={TABS.WHAT_CAN_I_DO.key}>
					<WhatCanIDoTab
						pageType={props.data.pageType}
						component={pageTypeDependency.component}
						impactGraph={pageTypeDependency.impactGraph}
						fixedVersion={pageTypeDependency.fixedVersion}
						remediation={remediation}
					/>
				</CustomTabPanel>
			)}
			{showContextualAnalysisTab && (
				<CustomTabPanel value={selectedTabIndex} index={TABS.CONTEXTUAL_ANALYSIS.key}>
					{pageTypeDependency.cve?.applicableData && showApplicabilityEvidence && (
						<ApplicabilityEvidence data={pageTypeDependency.cve.applicableData} />
					)}
				</CustomTabPanel>
			)}
			{showMoreInformationTab && (
				<CustomTabPanel value={selectedTabIndex} index={TABS.MORE_INFORMATION.key}>
					<Collapse
						header={
							<h1>
								<DocumentSvg /> {LABELS.DESCRIPTION}
							</h1>
						}
					>
						{/* @ts-ignore*/}
						<Markdown text={(props.data as ISastPage).description} />
					</Collapse>
				</CustomTabPanel>
			)}
			{props.tabs.includes(TABS.IMPACT_GRAPH.key) && treeNode && (
				<CustomTabPanel value={selectedTabIndex} index={TABS.IMPACT_GRAPH.key}>
					<ImpactGraph
						treeNode={treeNode}
						pathsLimit={(props.data as IDependencyPage).impactGraph.pathsLimit}
					/>
				</CustomTabPanel>
			)}
			{showCveInformationTab && (
				<CustomTabPanel value={selectedTabIndex} index={TABS.CVE_INFORMATION.key}>
					{(props.data as IDependencyPage).extendedInformation && (
						<Collapse
							header={
								<h1>
									<JfrogResearchIcon /> JFrog Research
								</h1>
							}
						>
							{/* @ts-ignore*/}
							<Research data={(props.data as IDependencyPage).extendedInformation} />
						</Collapse>
					)}
					<br />
					<Collapse
						header={
							<h1>
								<InfoIcon /> Public Sources
							</h1>
						}
					>
						<PublicSources
							summary={(props.data as IDependencyPage).summary}
							cve={(props.data as IDependencyPage).cve}
							infectedVersions={(props.data as IDependencyPage).infectedVersion}
						/>
					</Collapse>
					<br />
					{(props.data as IDependencyPage).references && (
						<Collapse
							header={
								<h1>
									<ReferenceIcon /> References
								</h1>
							}
						>
							<Reference data={(props.data as IDependencyPage).references as IReference[]} />
						</Collapse>
					)}
				</CustomTabPanel>
			)}
		</div>
	)
}

export default InformationTabs
