import css from './Research.module.css'
import { IExtendedInformation } from '../../../../../model'
import Markdown from '../../../../UI/Markdown/Markdown'
import Divider from '../../../../UI/Divider/Divider'
import { getSeverityImage } from '../../../../../utils/utils'
import { ReactComponent as LessRiskIcon } from '../../../../../assets/icons/less_risk.svg'
import { ReactComponent as MoreRiskIcon } from '../../../../../assets/icons/more_risk.svg'

export interface Props {
	data: IExtendedInformation
	isApplicable?: boolean
}
export const LABELS = {
	SUMMARY: 'Summary',
	REMEDIATION: 'Remediation',
	DETAILS: 'Details',
	JFROG_RESEARCH_SEVERITY_REASONS: 'JFrog Research Severity Reasons'
}

export default function Research(props: Props): JSX.Element {
	const increasesRisk = props.data.jfrogResearchSeverityReason?.filter(v => !v.isPositive)
	const decreasesRisk = props.data.jfrogResearchSeverityReason?.filter(v => v.isPositive)
	const hasJfrogResearchSeverityReasons =
		props.data.jfrogResearchSeverityReason && props.data.jfrogResearchSeverityReason.length > 0
	return (
		<div className={css.container}>
			<span className={css.alignCenterFlex}>
				<span className={css.label}>Severity:</span>{' '}
				{getSeverityImage(props.data.jfrogResearchSeverity, 16, props.isApplicable)}{' '}
				{props.data.jfrogResearchSeverity}
			</span>
			<Divider />
			<div className={css.group}>
				<h6>{LABELS.SUMMARY}</h6>
				{props.data.shortDescription}
			</div>
			{props.data.remediation && (
				<>
					<Divider />
					<div className={css.group}>
						<h6>{LABELS.REMEDIATION}</h6>
						<Markdown text={props.data.remediation} />
					</div>
				</>
			)}
			{props.data.fullDescription && (
				<>
					<Divider />
					<div className={css.group}>
						<h6>{LABELS.DETAILS}</h6>
						<Markdown text={props.data.fullDescription} />
					</div>
				</>
			)}
			{hasJfrogResearchSeverityReasons && (
				<>
					<Divider />
					<div className={css.group}>
						<h6>{LABELS.JFROG_RESEARCH_SEVERITY_REASONS}</h6>
						{increasesRisk && increasesRisk.length > 0 && (
							<>
								<span className={`${css.alignCenterFlex} ${css.redText}`}>
									<MoreRiskIcon /> Increases the risk level:
								</span>
								<ul className={css.bulletList}>
									{increasesRisk.map((reason, index) => (
										<li key={index}>
											<p>
												<b>{reason.name}</b>
											</p>
											<Markdown text={reason.description} />
										</li>
									))}
								</ul>
							</>
						)}
						{decreasesRisk && decreasesRisk.length > 0 && (
							<>
								<span className={`${css.alignCenterFlex} ${css.greenText}`}>
									<LessRiskIcon /> Decreases the risk level:
								</span>
								<ul className={css.bulletList}>
									{decreasesRisk.map((reason, index) => (
										<li key={index}>
											<p>
												<b>{reason.name}</b>
											</p>
											<Markdown text={reason.description} />
										</li>
									))}
								</ul>
							</>
						)}
					</div>
				</>
			)}
		</div>
	)
}
