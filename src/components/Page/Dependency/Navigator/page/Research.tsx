import css from './Research.module.css'
import { IExtendedInformation } from '../../../../../model/extendedInformation'
import Markdown from '../../../../UI/Markdown/Markdown'
import Divider from '../../../../UI/Divider/Divider'
import { getSeverityImage } from '../../../../../utils/utils'
import lessRiskIcon from '../../../../../assets/icons/less_risk.svg'
import moreRiskIcon from '../../../../../assets/icons/more_risk.svg'
import { ISeverity } from '../../../../../model'

export interface Props {
	data?: IExtendedInformation
}

export default function Research(props: Props): JSX.Element {
	const increasesRisk = props.data?.jfrogResearchSeverityReason?.filter(v => !v.isPositive)
	const decreasesRisk = props.data?.jfrogResearchSeverityReason?.filter(v => v.isPositive)

	return (
		<div className={css.container}>
			<span className={css.alignCenterFlex}>
				<span className={css.label}>Severity:</span>{' '}
				{getSeverityImage(props.data?.jfrogResearchSeverity ?? ISeverity.Unknown, true)}{' '}
				{props.data?.jfrogResearchSeverity}
			</span>
			<Divider />
			<div className={css.group}>
				<h6>Summery</h6>
				{props.data?.shortDescription}
			</div>
			{props.data?.remediation && (
				<>
					<Divider />
					<div className={css.group}>
						<h6>Remediation</h6>
						<Markdown text={props.data.remediation} />
					</div>
				</>
			)}
			<Divider />
			<div className={css.group}>
				<h6>Details</h6>
				<Markdown text={props.data?.fullDescription} />
			</div>
			<Divider />
			<div className={css.group}>
				<h6>Jfrog research severity Reasons</h6>
				{increasesRisk && increasesRisk.length > 0 && (
					<>
						<span className={css.alignCenterFlex} style={{ color: '#F14C4C' }}>
							<img src={moreRiskIcon} /> Increases the risk level:
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
						<span className={css.alignCenterFlex} style={{ color: '#3EB065' }}>
							<img src={lessRiskIcon} /> Decreases the risk level:
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
		</div>
	)
}
