import css from "./InformationTabs.module.css"
import { Collapse } from "../Collapse/Collapse"
import Markdown from "../Markdown/Markdown"
import { IImpactGraph } from "../../../model"

export interface WhatCanIDoTabProps {
    component?: string;
    remediation?: string[]
    fixedVersion?: string[]
    impactGraph?: IImpactGraph;
}

export default function WhatCanIDoTab(props: WhatCanIDoTabProps): JSX.Element {
    const isDirectDependency = (props.impactGraph?.root.children ?? []).findIndex(node => node.name.split(':')[0] === props.component) > -1
    return (
	<div className={css.container}>
		{(props.remediation || props.fixedVersion) &&
		<span className={css.text}>Follow one of the following actions:</span>}
		{props.remediation && props.remediation.length > 0 && <Collapse
			header={<h1>Patch the code</h1>}
			content={
				<div>
					<p><b>Remediation</b></p>
					{props.remediation.map((remediation, index) => (
						<Markdown text={remediation} key={index}/>
                        ))}
				</div>
                }/>}
		{props.fixedVersion && props.fixedVersion.length > 0 && <Collapse
			header={<h1>Update {isDirectDependency ? 'direct' : 'the indirect'} dependency</h1>}
			content={
				<div>
					<p className={css.alignCenterFlex}><span
						className={css.text}>Fix version: </span> {props.fixedVersion.join(", ")}
					</p>
				</div>
                }/>}
	</div>
    )
}