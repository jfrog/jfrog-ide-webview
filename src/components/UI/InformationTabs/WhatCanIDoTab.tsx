import css from './InformationTabs.module.css'
import { Collapse } from '../Collapse/Collapse'
import Markdown from '../Markdown/Markdown'
import { IImpactGraph, PageType } from '../../../model'
import Row from '../Row/Row'
import { ReactComponent as SadFace } from '../../../assets/icons/sad_face.svg'
import TypographyCss from '../../../styles/Typography.module.css'

export interface WhatCanIDoTabProps {
	pageType: PageType
	component?: string
	remediation?: string[]
	fixedVersion?: string[]
	impactGraph?: IImpactGraph
}

export default function WhatCanIDoTab(props: WhatCanIDoTabProps): JSX.Element {
	const isDirectDependency =
		(props.impactGraph?.root.children ?? []).findIndex(
			node => node.name.split(':')[0] === props.component
		) > -1
	const directDependanciesNames = (props.impactGraph?.root.children ?? []).map(
		node => node.name.split(':')[0]
	)
	const eosSuppressExample = `\`\`\`javascript 
// Javascript Example 
export: (req, res) => {
    res = set_cors(req, res)
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    payload = Buffer.from(req.body.data, "base64");
    // jfrog-ignore
    var data = serialize.unserialize(payload.toString());
\`\`\``
	const secretsSuppressExample = '```javascript \n// jfrog-ignore \nconst api_key = "2VTHzn1mKZ..."'
	const suppressIssueMarkdownExample =
		props.pageType === PageType.Eos ? eosSuppressExample : secretsSuppressExample

	const hasFixedVersion = props.fixedVersion && props.fixedVersion.length > 0
	const showSuppressFinding = [PageType.Eos, PageType.Secrets].includes(props.pageType)

	const hasAction = hasFixedVersion ?? props.remediation ?? showSuppressFinding
	return (
		<div className={css.container}>
			{hasAction ? (
				<span className={css.text}>Follow one of the following actions:</span>
			) : (
				<div className={css.emptyStateContainer}>
					<p>Seems like there is no action you can take at this time</p>
					<SadFace />
					<p className={TypographyCss.label}>
						Consider moving to another package or contact the maintainers to know when a fix will be
						available
					</p>
				</div>
			)}
			{hasFixedVersion && (
				<Collapse
					header={
						<h1>
							Update direct dependency
							<span className={css.recommendedLabel}>Recommended</span>
						</h1>
					}
					content={
						<div>
							{isDirectDependency ? (
								<span style={{ display: 'flex', gap: 8, flexDirection: 'column' }}>
									<Row title="Update the following" data={directDependanciesNames.join(', ')} />
									<Row title="Fix version" data={props.fixedVersion?.join(', ') as string} />
								</span>
							) : (
								<Row title="Update the following" data={directDependanciesNames.join(', ')} />
							)}
						</div>
					}
				/>
			)}
			{props.fixedVersion && props.fixedVersion.length > 0 && !isDirectDependency && (
				<Collapse
					header={<h1>Update the indirect dependency</h1>}
					content={
						<div>
							<span style={{ display: 'flex', gap: 8, flexDirection: 'column' }}>
								<Row title="Update the following" data={props.component as string} />
								<Row title="Fix version" data={props.fixedVersion.join(', ')} />
							</span>
						</div>
					}
				/>
			)}
			{props.remediation && props.remediation.length > 0 && (
				<Collapse
					header={
						<h1>
							Patch the code
							{[PageType.Eos].includes(props.pageType) && (
								<span className={css.recommendedLabel}>Recommended</span>
							)}
						</h1>
					}
					content={
						<div>
							<p>
								<b>Remediation</b>
							</p>
							{props.remediation.map((remediation, index) => (
								<Markdown text={remediation} key={index} />
							))}
						</div>
					}
				/>
			)}
			{[PageType.Eos, PageType.Secrets].includes(props.pageType) && (
				<Collapse
					header={<h1>Suppress the finding</h1>}
					content={
						<div>
							{/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
							<p>
								Add <code>jfrog-ignore</code> comment above the vulnerable line to suppress it
							</p>
							<Markdown text={suppressIssueMarkdownExample} />
						</div>
					}
				/>
			)}
		</div>
	)
}
