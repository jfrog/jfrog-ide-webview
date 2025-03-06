import css from './Header.module.css'
import { getSeverityImage } from '../../../utils/utils'
import {
	Applicability,
	IAnalysisStep,
	IDependencyPage,
	IIaCPage,
	ISastPage,
	ISecretsPage,
	PageType
} from '../../../model'
import { ReactComponent as JfrogResearchIcon } from '../../../assets/icons/jfrog_research_icon.svg'
import { ReactComponent as ApplicableIcon } from '../../../assets/icons/applicable.svg'
import { ReactComponent as NotApplicableIcon } from '../../../assets/icons/not_applicable.svg'
import { ReactComponent as UndeterminedIcon } from '../../../assets/icons/undetermined.svg'
import { ReactComponent as NotCoveredIcon } from '../../../assets/icons/not_covered.svg'
import { ReactComponent as MissingContextIcon } from '../../../assets/icons/missing_context.svg'
import { Tooltip } from '@mui/material'

export interface Props {
	text: string
	pageData: Partial<IDependencyPage | ISecretsPage | IIaCPage | ISastPage>
}

const MetadataSpan = (props: { metadata: string }): JSX.Element => (
	<span className={css.locationLabel}>
		<b>Token Info:</b> {props.metadata}
	</span>
)

const TokenValidationSpan = (props: { tokenValidation: string }): JSX.Element => (
	<span className={css.locationLabel}>
		<b>Token Validation:</b> {props.tokenValidation}
	</span>
)

const LocationSpan = (props: { location: IAnalysisStep }): JSX.Element => (
	<span className={css.locationLabel}>
		<b>Location:</b> {props.location.file}
	</span>
)

const RuleIdSpan = (props: { ruleId: string }): JSX.Element => (
	<span className={css.locationLabel}>
		<b>Rule ID:</b> {props.ruleId}
	</span>
)

const LineOfVulnSpan = (props: { lineOfVulnerability: number }): JSX.Element => (
	<span className={css.locationLabel}>
		<b>Line of vulnerability:</b> {props.lineOfVulnerability}
	</span>
)

const CveInformation = (props: { data: IDependencyPage }): JSX.Element => (
	<>
		<span className={css.cveLabel}>Component: {props.data.component}</span>
		{props.data.version && <span className={css.cveLabel}>Version: {props.data.version}</span>}
		{(props.data.cve?.cvssV3Score || props.data.cve?.cvssV3Score) && (
			<span className={css.cveLabel}>
				CVSS: &nbsp;
				{props.data.cve.cvssV3Score ? (
					<div className={css.redBox}>{props.data.cve.cvssV3Score} (v3)</div>
				) : (
					<div className={css.yellowBox}>{props.data.cve.cvssV2Score} (v2)</div>
				)}
			</span>
		)}
		{props.data.extendedInformation?.jfrogResearchSeverity && (
			<span className={css.cveLabel}>
				JFrog severity rank:{' '}
				{getSeverityImage(
					props.data.extendedInformation.jfrogResearchSeverity,
					16,
					props.data.cve?.applicableData?.applicability === Applicability.NOT_APPLICABLE
				)}
			</span>
		)}
	</>
)

export default function Header(props: Props): JSX.Element {
	const showLocationInPages = [PageType.IaC, PageType.Secrets, PageType.Sast].includes(
		props.pageData.pageType as PageType
	)
	const showCVEInfoInPages = PageType.Dependency === props.pageData.pageType
	const showJFrogResearchIcon =
		(props.pageData as IDependencyPage).extendedInformation !== undefined
	const applicableData = (props.pageData as IDependencyPage).cve?.applicableData

	const tokenValidation = (props.pageData as ISecretsPage).tokenValidation
		? (props.pageData as ISecretsPage).tokenValidation
		: undefined
	const metadata = (props.pageData as ISecretsPage).metadata
		? (props.pageData as ISecretsPage).metadata
		: undefined
	const ruleId = (props.pageData as ISastPage).ruleId
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	const lineOfVuln = (props.pageData as ISastPage).location
		? (props.pageData as ISastPage).location.startRow
		: undefined

	const metadataClassName = showCVEInfoInPages
		? css.cveInformationContainerRow
		: css.cveInformationContainerCol
	return (
		<div className={css.container}>
			<div className={css.content}>
				<div className={css.titleContainer}>
					{props.pageData.severity &&
						getSeverityImage(
							props.pageData.severity,
							16,
							applicableData?.applicability === Applicability.NOT_APPLICABLE
						)}
					<h6 className={css.flexCenter}>
						{props.text}
						{showJFrogResearchIcon && <JfrogResearchIcon id="jfrog_research_icon" />}
						{applicableData && <ApplicabilityIcon applicability={applicableData.applicability} />}
					</h6>
				</div>
				<div className={metadataClassName}>
					{showCVEInfoInPages && <CveInformation data={props.pageData as IDependencyPage} />}
					{showLocationInPages && (
						<LocationSpan location={(props.pageData as ISecretsPage).location} />
					)}
					{lineOfVuln && <LineOfVulnSpan lineOfVulnerability={lineOfVuln} />}
					{ruleId && <RuleIdSpan ruleId={ruleId} />}
					{tokenValidation && <TokenValidationSpan tokenValidation={tokenValidation} />}
					{metadata && <MetadataSpan metadata={metadata} />}
				</div>
			</div>
		</div>
	)
}

const ApplicabilityTooltipIcon = ({
	icon: Icon,
	text
}: {
	icon: JSX.Element
	text: string
}): JSX.Element => (
	<Tooltip title={text} arrow>
		<span>{Icon}</span>
	</Tooltip>
)

const ApplicabilityIcon = ({
	applicability
}: {
	applicability: Applicability
}): JSX.Element | null => {
	const getText = (applicability: Applicability): string => {
		switch (applicability) {
			case Applicability.APPLICABLE:
				return 'The vulnerability can be exploited in the context of the scanned artifact'
			case Applicability.NOT_APPLICABLE:
				return 'The vulnerability cannot be exploited in the context of the scanned artifact'
			case Applicability.NOT_COVERED:
				return "Scanner isn't available"
			case Applicability.UNDETERMINED:
				return 'The applicability cannot be determined by static analysis (e.g. the exploitation requires user interaction)'
			case Applicability.MISSING_CONTEXT:
				return 'Reachability analysis cannot determine the vulnerability’s applicability. Applicability can be determined by scanning the artifact in a Docker repository in the JFrog Platform'
			default:
				return ''
		}
	}

	const applicabilityIcons = {
		[Applicability.APPLICABLE]: <ApplicableIcon id="applicable_icon" />,
		[Applicability.NOT_APPLICABLE]: <NotApplicableIcon id="not_applicable_icon" />,
		[Applicability.NOT_COVERED]: <NotCoveredIcon id="not_covered_icon" />,
		[Applicability.UNDETERMINED]: <UndeterminedIcon id="undetermined_icon" />,
		[Applicability.MISSING_CONTEXT]: <MissingContextIcon id="missing_context_icon" />
	}

	const icon = applicabilityIcons[applicability]
	const tooltipText = getText(applicability)
	return <ApplicabilityTooltipIcon icon={icon} text={tooltipText} />
}
