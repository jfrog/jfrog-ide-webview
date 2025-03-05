import css from './InformationTabs.module.css'
import { Collapse } from '../Collapse/Collapse'
import Markdown from '../Markdown/Markdown'
import { IImpactGraph, PageType } from '../../../model'
import Row from '../Row/Row'
import { ReactComponent as SadFace } from '../../../assets/icons/sad_face.svg'
import { sastSuppressExample, secretsSuppressExample } from './texts'

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
			{/* eslint-disable-next-line react/no-unescaped-entities */}
			<p>It seems that we have no suggestions for fixing this issue</p>
			<SadFace />
			<p className={css.label}>
				Consider using another package or contact the maintainers for a possible fix
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
					{[PageType.Sast].includes(props.pageType) && (
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
		props.pageType === PageType.Sast ? sastSuppressExample : secretsSuppressExample
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
	SUPPRESS_THE_FINDING: 'Suppress the Finding',
	PATCH_THE_CODE: 'Patch the Code',
	REMEDIATION: 'Remediation',
	UPDATE_THE_INDIRECT_DEPENDENCY: 'Update the Indirect Dependency',
	UPDATE_THE_DIRECT_DEPENDENCY: 'Update the Direct Dependency'
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
	const showSuppressFinding = [PageType.Sast, PageType.Secrets].includes(props.pageType)

	const hasAction = props.remediation ?? hasFixedVersion ?? showSuppressFinding
	return (
		<div className={css.container}>
			{!hasAction && <EmptyStateContainer />}
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
