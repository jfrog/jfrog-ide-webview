import { Applicability, IApplicableDetails, IEvidence } from '../../../../model'
import { Collapse } from '../../Collapse/Collapse'
import css from './ApplicabilityEvidence.module.css'
import { ReactComponent as EvidenceSvg } from '../../../../assets/icons/evidence.svg'
import Markdown from '../../Markdown/Markdown'
import { useEffect } from 'react'
import EvidenceList from './EvidenceList'

export interface Props {
	data: IApplicableDetails
}

const APPLICABILITY_TITLES: Partial<Record<Applicability, string>> = {
	[Applicability.APPLICABLE]: 'Why is this CVE applicable?',
	[Applicability.NOT_APPLICABLE]: 'Why is this CVE not applicable?',
	[Applicability.UNDETERMINED]: 'Why is this CVE applicability result undetermined?',
	[Applicability.MISSING_CONTEXT]: 'Why is this CVE missing context?'
}

const MISSING_CONTEXT_REASON =
	'The applicability for this CVE could be determined in binary files only'

export default function ApplicabilityEvidence(props: Props): JSX.Element {
	const { data } = props

	useEffect(() => {
		if (props.data.applicability === Applicability.MISSING_CONTEXT) {
			data.evidence = [{ reason: MISSING_CONTEXT_REASON } as IEvidence]
			data.searchTarget = ''
		}
	}, [data, props.data.applicability])

	return (
		<Collapse
			expanded
			header={
				<h1>
					<EvidenceSvg /> Contextual Analysis
				</h1>
			}
		>
			<div className={css.defaultContainer}>
				<h6 className={css.subtitle}>{APPLICABILITY_TITLES[props.data.applicability]}</h6>
				{data.evidence && data.evidence.length > 0 && (
					<EvidenceList evidenceList={data.evidence} type={data.applicability} />
				)}
				{data.searchTarget && data.searchTarget !== '' && (
					<>
						<h6 className={css.subtitle}>What does the scanner check/look for?</h6>
						<Markdown text={data.searchTarget} />
					</>
				)}
			</div>
		</Collapse>
	)
}
