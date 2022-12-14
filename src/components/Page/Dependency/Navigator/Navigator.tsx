import { useState } from 'react'
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
	return (
		<>
			<div>
				<Tab
					items={[
						{
							text: 'JFrog Research',
							hide: isJfrogResearchHidden(props.data.extendedInformation)
						},
						{
							text: 'Contextual Analysis',
							hide: isContextualAnalysisHidden(props.data.cve)
						},
						{ text: 'Public Resources', hide: isPublicResourcesHidden(props.data.cve) },
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

const isContextualAnalysisHidden = (cveData: ICve | undefined): boolean => cveData === undefined || cveData.applicably === undefined

const isPublicResourcesHidden = (cveData: ICve | undefined): boolean => cveData === undefined || (cveData.cvssV2Score === undefined && cveData.cvssV3Score === undefined)

export default Navigator