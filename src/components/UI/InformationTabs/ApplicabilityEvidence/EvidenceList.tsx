import ApplicabilityRow from './ApplicabilityRow'
import css from './ApplicabilityEvidence.module.css'
import { Applicability, IEvidence } from '../../../../model'
import Divider from '../../../UI/Divider/Divider'

interface EvidenceListProps {
	evidenceList: IEvidence[]
	type: Applicability
}

const EvidenceList = ({ evidenceList, type }: EvidenceListProps): JSX.Element => {
	const rows = evidenceList.map((evidence, index) => (
		<div key={index}>
			<ApplicabilityRow title="Reason" data={evidence.reason} />
			{type === Applicability.APPLICABLE && (
				<>
					<ApplicabilityRow title="Evidence file path" data={evidence.filePathEvidence} />
					<ApplicabilityRow title="Evidence code" data={evidence.codeEvidence} />
				</>
			)}
		</div>
	))

	return (
		<>
			<div className={css.rowList}>{rows}</div>
			<Divider />
		</>
	)
}

export default EvidenceList
