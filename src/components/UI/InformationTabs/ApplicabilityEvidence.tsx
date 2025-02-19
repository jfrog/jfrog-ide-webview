import { Applicability, IApplicableDetails, IEvidence } from '../../../model'
import { Collapse } from '../Collapse/Collapse'
import css from './ApplicabilityEvidence.module.css'
import { ReactComponent as EvidenceSvg } from '../../../assets/icons/evidence.svg'
import Row from '../../UI/Row/Row'
import Divider from '../../UI/Divider/Divider'
import Markdown from '../../UI/Markdown/Markdown'

export interface Props {
	data: IApplicableDetails;
}

const APPLICABILITY_TITLES: Record<Applicability, string> = {
	[Applicability.APPLICABLE]: 'Why is this CVE applicable?',
	[Applicability.NOT_APPLICABLE]: 'Why is this CVE not applicable?',
	[Applicability.UNDETERMINED]: 'Why is this CVE undetermined?',
	[Applicability.NOT_COVERED]: 'Why is this CVE not covered?',
	[Applicability.MISSING_CONTEXT]: 'Why is this CVE missing context?'
}

const renderRow = (title: string, data: string): JSX.Element => (
	<Row title={title} data={data} />
)

const renderEvidenceList = (evidenceList: IEvidence[], type: Applicability): JSX.Element => {
	const rows = evidenceList.map((evidence, index) => {
		const rowComponents: JSX.Element[] = [renderRow('Reason', evidence.reason)]

		if (type === Applicability.APPLICABLE) {
			rowComponents.push(
				renderRow('Evidence file path', evidence.filePathEvidence),
				renderRow('Evidence code', evidence.codeEvidence)
			)
		}

		return <div key={index}>{rowComponents}</div>
	})

	return (
		<>
			<h6 className={css.subtitle}>{APPLICABILITY_TITLES[type]}</h6>
			<div>
				<div className={css.rowList}>{rows}</div>
			</div>
			<Divider />
		</>
	)
}

export default function ApplicabilityEvidence(props: Props): JSX.Element {
	const { data } = props

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
				{data.evidence && renderEvidenceList(data.evidence, data.applicability)}
				{data.searchTarget && (
					<>
						<h6 className={css.subtitle}>What does the scanner check/look for?</h6>
						<Markdown text={data.searchTarget} />
					</>
				)}
			</div>
		</Collapse>
	)
}