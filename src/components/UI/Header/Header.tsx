import css from './Header.module.css'
import { getSeverityImage } from '../../../utils/utils'
import {
	IAnalysisStep,
	IDependencyPage,
	IEosPage,
	IIaCPage,
	ISecretsPage,
	PageType
} from '../../../model'
import { ReactComponent as JfrogResearchIcon } from '../../../assets/icons/jfrog_research_icon.svg'
import { ReactComponent as ApplicableIcon } from '../../../assets/icons/applicable.svg'
import { ReactComponent as NotApplicableIcon } from '../../../assets/icons/not_applicable.svg'

export interface Props {
	text: string
	pageData: Partial<IDependencyPage | ISecretsPage | IIaCPage | IEosPage>
}

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
				{getSeverityImage(props.data.extendedInformation.jfrogResearchSeverity, true, 16)}
			</span>
		)}
	</>
)

export default function Header(props: Props): JSX.Element {
	const showLocationInPages = [PageType.IaC, PageType.Secrets, PageType.Eos].includes(
		props.pageData.pageType as PageType
	)
	const showCVEInfoInPages = PageType.Dependency === props.pageData.pageType
	const showJFrogResearchIcon =
		(props.pageData as IDependencyPage).extendedInformation !== undefined
	const applicableData = (props.pageData as IDependencyPage).cve?.applicableData

	const ruleId = (props.pageData as IEosPage).ruleId
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	const lineOfVuln = (props.pageData as IEosPage).location
		? (props.pageData as IEosPage).location.startRow
		: undefined

	return (
		<div className={css.container}>
			<div className={css.content}>
				<div className={css.titleContainer}>
					{props.pageData.severity && getSeverityImage(props.pageData.severity, true)}
					<h6 className={css.flexCenter}>
						{props.text}
						{showJFrogResearchIcon && <JfrogResearchIcon id="jfrog_research_icon" />}
						{applicableData &&
							(applicableData.isApplicable ? (
								<ApplicableIcon id="applicable_icon" />
							) : (
								<NotApplicableIcon id="not_applicable_icon" />
							))}
					</h6>
				</div>
				<div className={css.cveInformationContainer}>
					{showCVEInfoInPages && <CveInformation data={props.pageData as IDependencyPage} />}
					{showLocationInPages && (
						<LocationSpan location={(props.pageData as ISecretsPage).location} />
					)}
					{ruleId && <RuleIdSpan ruleId={ruleId} />}
					{lineOfVuln && <LineOfVulnSpan lineOfVulnerability={lineOfVuln} />}
				</div>
			</div>
		</div>
	)
}
