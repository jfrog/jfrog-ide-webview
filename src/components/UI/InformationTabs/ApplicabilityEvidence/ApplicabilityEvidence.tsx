import { Applicability, IApplicableDetails, IEvidence } from '../../../../model'
import { Collapse } from '../../Collapse/Collapse'
import css from './ApplicabilityEvidence.module.css'
import { ReactComponent as EvidenceSvg } from '../../../../assets/icons/evidence.svg'
import Markdown from '../../Markdown/Markdown'
import { useEffect, useState } from 'react'
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
	'Reachability analysis cannot determine the vulnerability’s applicability. Applicability can be determined by scanning the artifact in a Docker repository in the JFrog Platform'

export default function ApplicabilityEvidence(props: Props): JSX.Element {
	const [evidence, setEvidence] = useState<IEvidence[]>([])
	const [searchTarget, setSearchTarget] = useState<string>('')

	useEffect(() => {
		if (props.data.applicability === Applicability.MISSING_CONTEXT) {
			const updatedEvidence = [{ reason: MISSING_CONTEXT_REASON } as IEvidence]
			setEvidence(updatedEvidence)
			setSearchTarget('')
		} else {
			setEvidence(props.data.evidence ?? [])
			setSearchTarget(props.data.searchTarget ?? '')
		}
	}, [props.data.applicability, props.data.evidence, props.data.searchTarget])

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
				{evidence.length > 0 && (
					<EvidenceList evidenceList={evidence} type={props.data.applicability} />
				)}
				{searchTarget && (
					<>
						<h6 className={css.subtitle}>What does the scanner check/look for?</h6>
						<Markdown text={searchTarget} />
					</>
				)}
			</div>
		</Collapse>
	)
}
