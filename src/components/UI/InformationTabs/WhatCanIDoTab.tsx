import css from './InformationTabs.module.css'
import { Collapse } from '../Collapse/Collapse'
import Markdown from '../Markdown/Markdown'
import { IImpactGraph, PageType } from '../../../model'
import Row from '../Row/Row'
import { ReactComponent as SadFace } from '../../../assets/icons/sad_face.svg'
import TypographyCss from '../../../styles/Typography.module.css'
import { eosSuppressExample, secretsSuppressExample } from './texts'

interface Props {
	pageType: PageType
	component?: string
	remediation?: string[]
	fixedVersion?: string[]
	impactGraph?: IImpactGraph
}

function EmptyStateContainer(): JSX.Element {
	return (
		<div className={css.emptyStateContainer}>
			<p>Seems like there is no action you can take at this time</p>
			<SadFace />
			<p className={TypographyCss.label}>
				Consider moving to another package or contact the maintainers to know when a fix will be
				available
			</p>
		</div>
	)
}

function UpdateDirectDependency(props: {
	isDirectDependency: boolean
	directDependenciesNames: string[]
	fixedVersion?: string[]
}): JSX.Element {
	return (
		<Collapse
			header={
				<h1>
					{LABELS.UPDATE_THE_DIRECT_DEPENDENCY}
					<span className={css.recommendedLabel}>Recommended</span>
				</h1>
			}
		>
			<div>
				{props.isDirectDependency ? (
					<span className={css.columns}>
						<Row title="Update the following" data={props.directDependenciesNames.join(', ')} />
						<Row title="Fix version" data={props.fixedVersion?.join(', ') ?? ''} />
					</span>
				) : (
					<Row title="Update the following" data={props.directDependenciesNames.join(', ')} />
				)}
			</div>
		</Collapse>
	)
}

function UpdateIndirectDependency(props: {
	component: string
	fixedVersion?: string[]
}): JSX.Element {
	return (
		<Collapse header={<h1>{LABELS.UPDATE_THE_INDIRECT_DEPENDENCY}</h1>}>
			<div>
				<span className={css.columns}>
					<Row title="Update the following" data={props.component} />
					<Row title="Fix version" data={props.fixedVersion?.join(', ') ?? ''} />
				</span>
			</div>
		</Collapse>
	)
}

function PatchTheCode(props: { pageType: PageType; remediation: string[] }): JSX.Element {
	return (
		<Collapse
			header={
				<h1>
					{LABELS.PATCH_THE_CODE}
					{[PageType.Eos].includes(props.pageType) && (
						<span className={css.recommendedLabel}>Recommended</span>
					)}
				</h1>
			}
		>
			<div>
				<p>
					<b>{LABELS.REMEDIATION}</b>
				</p>
				{props.remediation.map((remediation, index) => (
					<Markdown text={remediation} key={index} />
				))}
			</div>
		</Collapse>
	)
}

function SuppressTheFinding(props: { pageType: PageType }): JSX.Element {
	const suppressIssueMarkdownExample =
		props.pageType === PageType.Eos ? eosSuppressExample : secretsSuppressExample
	return (
		<Collapse header={<h1>{LABELS.SUPPRESS_THE_FINDING}</h1>}>
			<div>
				{/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
				<p>
					Add <code>jfrog-ignore</code> comment above the vulnerable line to suppress it
				</p>
				<Markdown text={suppressIssueMarkdownExample} />
			</div>
		</Collapse>
	)
}

export const LABELS = {
	SUPPRESS_THE_FINDING: 'Suppress the finding',
	PATCH_THE_CODE: 'Patch the code',
	REMEDIATION: 'Remediation',
	UPDATE_THE_INDIRECT_DEPENDENCY: 'Update the indirect dependency',
	UPDATE_THE_DIRECT_DEPENDENCY: 'Update the direct dependency'
}

export default function WhatCanIDoTab(props: Props): JSX.Element {
	const isDirectDependency =
		(props.impactGraph?.root.children ?? []).findIndex(
			node => node.name.split(':')[0] === props.component
		) > -1
	const directDependenciesNames = (props.impactGraph?.root.children ?? []).map(
		node => node.name.split(':')[0]
	)

	const hasFixedVersion = props.fixedVersion && props.fixedVersion.length > 0
	const showSuppressFinding = [PageType.Eos, PageType.Secrets].includes(props.pageType)

	const hasAction = hasFixedVersion ?? props.remediation ?? showSuppressFinding
	return (
		<div className={css.container}>
			{hasAction ? (
				<span className={css.text}>Follow one of the following actions:</span>
			) : (
				<EmptyStateContainer />
			)}
			{hasFixedVersion && (
				<UpdateDirectDependency
					directDependenciesNames={directDependenciesNames}
					isDirectDependency={isDirectDependency}
					fixedVersion={props.fixedVersion}
				/>
			)}
			{props.fixedVersion && props.fixedVersion.length > 0 && !isDirectDependency && (
				<UpdateIndirectDependency
					fixedVersion={props.fixedVersion}
					component={props.component ?? ''}
				/>
			)}
			{props.remediation && props.remediation.length > 0 && (
				<PatchTheCode pageType={props.pageType} remediation={props.remediation} />
			)}
			{showSuppressFinding && <SuppressTheFinding pageType={props.pageType} />}
		</div>
	)
}
