import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import React, { useEffect, useState } from 'react'
import { COLORS } from '../../../styles'
import { Collapse } from '../Collapse/Collapse'
import css from './InformationTabs.module.css'
import { ReactComponent as DocumentSvg } from '../../../assets/icons/document.svg'
import { ReactComponent as JfrogResearchIcon } from '../../../assets/icons/jfrog_research_icon.svg'
import { ReactComponent as InfoIcon } from '../../../assets/icons/info.svg'
import { ReactComponent as ReferenceIcon } from '../../../assets/icons/refrence.svg'
import { IDependencyPage, IEosPage, IIaCPage, ISecretsPage, PageType } from '../../../model'
import PublicSources from '../../Page/Dependency/Navigator/page/PublicSources'
import Research from '../../Page/Dependency/Navigator/page/Research'
import Reference from '../../Page/Dependency/Navigator/page/Reference'
import ImpactGraph from '../../Page/Dependency/Navigator/page/ImpactGraph'
import { TreeNode } from '../../../model/treeNode'
import { toTreeNode } from '../../../utils/utils'
import WhatCanIDoTab from './WhatCanIDoTab'
import Markdown from '../Markdown/Markdown'

export const TABS = {
	WHAT_CAN_I_DO: {
		label: 'What can I do',
		key: 'what_can_i_do'
	},
	MORE_INFORMATION: {
		label: 'More information',
		key: 'more_information'
	},
	CVE_INFORMATION: {
		label: 'CVE information',
		key: 'cve_information'
	},
	IMPACT_GRAPH: {
		label: 'Impact graph',
		key: 'impact_graph'
	}
}
export const LABELS = {
	DESCRIPTION: 'Description'
}
const defaultTabStyle = {
	color: COLORS.GRAY_100,
	fontWeight: 400,
	textTransform: 'none'
}
const activeTabStyle = {
	color: COLORS.PRIMARY,
	textTransform: 'none'
}

export interface Props {
	data: ISecretsPage | IDependencyPage | IEosPage | IIaCPage
	tabs: string[]
}

interface TabPanelProps {
	children?: React.ReactNode
	index: string
	value: string
}

function CustomTabPanel(props: TabPanelProps): JSX.Element {
	const { children, value, index, ...other } = props

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && children}
		</div>
	)
}

function InformationTabs(props: Props): JSX.Element {
	const defaultTab = props.tabs[0]
	const [value, setValue] = React.useState(defaultTab)
	const [treeNode, setTreeNode] = useState<TreeNode | undefined>()
	const impactGraph = (props.data as IDependencyPage).impactGraph
	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (impactGraph) {
			setTreeNode(toTreeNode(impactGraph.root))
		}
	}, [impactGraph])

	const handleChange = (event: React.SyntheticEvent, newValue: string): void => {
		setValue(newValue)
	}

	function tabStyle(tab: string): any {
		return value === tab ? activeTabStyle : defaultTabStyle
	}

	const showWhatCanIDoTab = props.tabs.includes(TABS.WHAT_CAN_I_DO.key)
	const showCveInformationTab = props.tabs.includes(TABS.CVE_INFORMATION.key)
	const showImpactGraphTab = props.tabs.includes(TABS.IMPACT_GRAPH.key)
	let remediation: string[] | undefined
	const extendedInformation = (props.data as IDependencyPage).extendedInformation

	switch (props.data.pageType) {
		case PageType.Eos:
			remediation = (props.data as IEosPage).remediation

			if (!remediation) {
				const content = (props.data as IEosPage).description
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
			case PageType.Eos:
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

	return (
		<div style={{ overflow: 'hidden' }}>
			<div className={css.tabsContainer}>
				<Tabs
					style={{ borderBottom: '1px solid #454545' }}
					TabIndicatorProps={{ style: { backgroundColor: COLORS.PRIMARY } }}
					value={value}
					onChange={handleChange}
				>
					{showWhatCanIDoTab && (
						<Tab
							style={tabStyle(TABS.WHAT_CAN_I_DO.key)}
							value={TABS.WHAT_CAN_I_DO.key}
							label={TABS.WHAT_CAN_I_DO.label}
						/>
					)}
					{showCveInformationTab && (
						<Tab
							style={tabStyle(TABS.CVE_INFORMATION.key)}
							value={TABS.CVE_INFORMATION.key}
							label={TABS.CVE_INFORMATION.label}
						/>
					)}
					{showImpactGraphTab && (
						<Tab
							style={tabStyle(TABS.IMPACT_GRAPH.key)}
							value={TABS.IMPACT_GRAPH.key}
							label={TABS.IMPACT_GRAPH.label}
						/>
					)}
					{props.tabs.includes(TABS.MORE_INFORMATION.key) && (
						<Tab
							style={tabStyle(TABS.MORE_INFORMATION.key)}
							value={TABS.MORE_INFORMATION.key}
							label={TABS.MORE_INFORMATION.label}
						/>
					)}
				</Tabs>
				{showWhatCanIDoTab && (
					<CustomTabPanel value={value} index={TABS.WHAT_CAN_I_DO.key}>
						<WhatCanIDoTab
							pageType={props.data.pageType}
							component={(props.data as IDependencyPage).component}
							impactGraph={(props.data as IDependencyPage).impactGraph}
							fixedVersion={(props.data as IDependencyPage).fixedVersion}
							remediation={remediation}
						/>
					</CustomTabPanel>
				)}
				{props.tabs.includes(TABS.MORE_INFORMATION.key) && (
					<CustomTabPanel value={value} index={TABS.MORE_INFORMATION.key}>
						<Collapse
							header={
								<h1>
									<DocumentSvg /> {LABELS.DESCRIPTION}
								</h1>
							}
							content={<Markdown text={(props.data as IEosPage).description} />}
						/>
					</CustomTabPanel>
				)}
				{props.tabs.includes(TABS.IMPACT_GRAPH.key) && treeNode && (
					<CustomTabPanel value={value} index={TABS.IMPACT_GRAPH.key}>
						<ImpactGraph
							treeNode={treeNode}
							pathsLimit={(props.data as IDependencyPage).impactGraph.pathsLimit}
							pathsCount={(props.data as IDependencyPage).impactGraph.pathsCount}
						/>
					</CustomTabPanel>
				)}
				{showCveInformationTab && (
					<CustomTabPanel value={value} index={TABS.CVE_INFORMATION.key}>
						{(props.data as IDependencyPage).extendedInformation && (
							<Collapse
								header={
									<h1>
										<JfrogResearchIcon /> JFrog Research
									</h1>
								}
								content={<Research data={(props.data as IDependencyPage).extendedInformation} />}
							/>
						)}
						<br />
						<Collapse
							header={
								<h1>
									<InfoIcon /> Public Sources
								</h1>
							}
							content={
								<PublicSources
									summary={(props.data as IDependencyPage).summary}
									cve={(props.data as IDependencyPage).cve}
									infectedVersions={(props.data as IDependencyPage).infectedVersion}
								/>
							}
						/>
						<br />
						{(props.data as IDependencyPage).references && (
							<Collapse
								header={
									<h1>
										<ReferenceIcon /> References
									</h1>
								}
								content={<Reference data={(props.data as IDependencyPage).references} />}
							/>
						)}
					</CustomTabPanel>
				)}
			</div>
		</div>
	)
}

export default InformationTabs
