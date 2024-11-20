import { IApplicableDetails } from '../../../model'
import { Collapse } from '../../UI/Collapse/Collapse'
import css from './ApplicabilityEvidence.module.css'
import { ReactComponent as EvidenceSvg } from '../../../assets/icons/evidence.svg'
import Row from '../../UI/Row/Row'
import Divider from '../../UI/Divider/Divider'
import Markdown from '../../UI/Markdown/Markdown'

export interface Props {
	data: IApplicableDetails
}

export default function ApplicabilityEvidence(props: Props): JSX.Element {
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
				{/* If CVE is applicable */}
				{props.data.isApplicable ? (
					<>
						<h6 className={css.subtitle}>Why is this CVE applicable?</h6>
						<div>
							<div className={css.rowList}>
								{props.data.evidence?.map((evidence, i) => (
									<div key={i}>
										<Row title="Reason" data={evidence.reason} />
										<Row title="Evidence file path" data={evidence.filePathEvidence} />
										<Row title="Evidence code" data={evidence.codeEvidence} />
									</div>
								))}
							</div>
						</div>
						<Divider />
					</>
				) : (
					// If CVE is not applicable
					<>
						<h6 className={css.subtitle}>Why is this CVE not applicable?</h6>
						<div>
							<div className={css.rowList}>
								{props.data.evidence?.map((evidence, i) => (
									<div key={i}>
										<Row title="Reason" data={evidence.reason} />
									</div>
								))}
							</div>
						</div>
						<Divider />
					</>
				)}
				{props.data.searchTarget && (
					<>
						<h6 className={css.subtitle}>What does the scanner check/look for?</h6>
						<Markdown text={props.data.searchTarget} />
					</>
				)}
			</div>
		</Collapse>
	)
}
