import { useState, useEffect } from 'react'
import { IDependencyPage, ICve, IReference, IExtendedInformation } from '../../../../model'
import PageHolder from './PageHolder'
import Tab from './Tab'

export interface Props {
  data: IDependencyPage
}

const Navigator = (props: Props) => {
	const [pageIndex, setPageIndex] = useState(0)
	const tabChangeHandler = (index: number) => {
		setPageIndex(index)
	}
	const hideResearch = isJfrogResearchHidden(props.data.extendedInformation)
	const hideContextual = isContextualAnalysisHidden(props.data.cve)
	const hidePublicResources = isPublicResourcesHidden(props.data.cve)
	useEffect(() => {
		if (!hideResearch) {
			setPageIndex(0)
		} else if (!hideContextual) {
			setPageIndex(1)
		} else if (!hidePublicResources) {
			setPageIndex(2)
		} else {
			setPageIndex(3)
		}
	}, [])
	return (
		<>
			<div>
				<Tab
					items={[
						{
							text: 'JFrog Research',
							hide: hideResearch
						},
						{
							text: 'Contextual Analysis',
							hide: hideContextual
						},
						{ text: 'Public Sources', hide: hidePublicResources },
						{ text: 'Impact Path', hide: false },
						{
							text: 'References',
							hide: isReferenceHidden(props.data.references)
						}
					]}
					onChangeMenu={tabChangeHandler}/>
			</div>
			<PageHolder index={pageIndex} DependencyData={props.data}/>
		</>
	)
}

const isJfrogResearchHidden = (researchData: IExtendedInformation | undefined): boolean => researchData === undefined

const isReferenceHidden = (references: IReference[] | undefined): boolean => references === undefined || references.length === 0

const isContextualAnalysisHidden = (cveData: ICve | undefined): boolean => cveData === undefined || cveData.applicableData === undefined || cveData.applicableData.isApplicable === false

const isPublicResourcesHidden = (cveData: ICve | undefined): boolean => cveData === undefined || (cveData.cvssV2Score === undefined && cveData.cvssV3Score === undefined)

export default Navigator