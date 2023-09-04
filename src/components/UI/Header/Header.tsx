import css from './Header.module.css'
import { ISeverity } from './../../../model/severity'
import { getSeverityImage } from './../../../utils/utils'
import {
	IAnalysisStep,
	IDependencyPage,
	IEosPage,
	IIaCPage,
	ISecretsPage,
	PageType
} from '../../../model'
import cveCss from '../Summary/CveVulnerability.module.css'
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

const CveInformation = (props: { data: IDependencyPage }): JSX.Element => (
	<div className={css.cveInformationContainer}>
		<span className={css.cveLabel}>Component: {props.data.component}</span>
		{props.data.version && <span className={css.cveLabel}>Version: {props.data.version}</span>}
		<span className={css.cveLabel}>
			CVSS: &nbsp;
			{props.data.cve?.cvssV2Score && (
				<div className={cveCss.redBox}>{props.data.cve.cvssV2Score} (v2)</div>
			)}
		</span>
		<span className={css.cveLabel}>
			JFrog severity rank:{' '}
			{getSeverityImage(
				props.data.extendedInformation?.jfrogResearchSeverity ?? ISeverity.Unknown,
				true
			)}
		</span>
	</div>
)

export default function Header(props: Props): JSX.Element {
	const showLocationInPages = [PageType.IaC, PageType.Secrets, PageType.Eos].includes(
		props.pageData.pageType as PageType
	)
	const showCVEInfoInPages = PageType.Dependency === props.pageData.pageType
	const showJFrogResearchIcon =
		(props.pageData as IDependencyPage).extendedInformation !== undefined
	const applicableData = (props.pageData as IDependencyPage).cve?.applicableData
	return (
		<div className={css.container}>
			<div className={css.content}>
				<div className={css.titleContainer}>
					{props.pageData.severity && getSeverityImage(props.pageData.severity, true)}
					<h6 className={css.flexCenter}>
						{props.text}
						{showJFrogResearchIcon && <JfrogResearchIcon />}
						{applicableData &&
							(applicableData.isApplicable ? <ApplicableIcon /> : <NotApplicableIcon />)}
					</h6>
				</div>
				{showCVEInfoInPages && <CveInformation data={props.pageData as IDependencyPage} />}
				{showLocationInPages && (
					<LocationSpan location={(props.pageData as ISecretsPage).location} />
				)}
			</div>
		</div>
	)
}
