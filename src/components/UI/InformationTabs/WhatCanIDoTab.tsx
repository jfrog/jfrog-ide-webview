import css from './InformationTabs.module.css'
import { Collapse } from '../Collapse/Collapse'
import Markdown from '../Markdown/Markdown'
import { IImpactGraph, PageType } from '../../../model'

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

	return (
		<div className={css.container}>
			{(props.remediation || props.fixedVersion) && (
				<span className={css.text}>Follow one of the following actions:</span>
			)}
			{props.remediation && props.remediation.length > 0 && (
				<Collapse
					header={
						<h1>
							Patch the code{' '}
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
			{props.fixedVersion && props.fixedVersion.length > 0 && (
				<Collapse
					header={
						<h1>
							Update direct dependency <span className={css.recommendedLabel}>Recommended</span>
						</h1>
					}
					content={
						<div>
							<p className={css.alignCenterFlex}>
								{isDirectDependency ? (
									<span style={{ display: 'flex', gap: 8, flexDirection: 'column' }}>
										<span>
											<span className={css.text}>Update the following:</span>{' '}
											<span>{directDependanciesNames.join(', ')}</span>
										</span>
										<span>
											<span className={css.text}>Fix version:</span>{' '}
											<span>{props.fixedVersion.join(', ')}</span>
										</span>
									</span>
								) : (
									<span>
										<span className={css.text}>Update the following:</span>{' '}
										<span>{directDependanciesNames.join(', ')}</span>
									</span>
								)}
							</p>
						</div>
					}
				/>
			)}
			{props.fixedVersion && props.fixedVersion.length > 0 && !isDirectDependency && (
				<Collapse
					header={<h1>Update the indirect dependency</h1>}
					content={
						<div>
							<p className={css.alignCenterFlex}>
								<span style={{ display: 'flex', gap: 8, flexDirection: 'column' }}>
									<span>
										<span className={css.text}>Update the following:</span>{' '}
										<span>{props.component}</span>
									</span>
									<span>
										<span className={css.text}>Fix version:</span>{' '}
										<span>{props.fixedVersion.join(', ')}</span>
									</span>
								</span>
							</p>
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
							<Markdown
								text={
									'```javascript \n' +
									'// Javascript Example \n' +
									'export: (req, res) => {\n' +
									'    res = set_cors(req, res)\n' +
									"    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');\n" +
									'    payload = Buffer.from(req.body.data, "base64");\n' +
									'    // jfrog-ignore\n' +
									'    var data = serialize.unserialize(payload.toString());\n' +
									'```'
								}
							/>
						</div>
					}
				/>
			)}
		</div>
	)
}
