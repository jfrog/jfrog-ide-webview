import { IImpactGraphNode, ISeverity } from '../model'
import { TreeNode } from '../model/treeNode'
import css from '../components/UI/TreeViewer/TreeViewer.module.css'

import { ReactComponent as Unknown } from '../assets/icons/severity/unknown.svg'
import { ReactComponent as Critical } from '../assets/icons/severity/critical.svg'
import { ReactComponent as High } from '../assets/icons/severity/high.svg'
import { ReactComponent as Medium } from '../assets/icons/severity/medium.svg'
import { ReactComponent as Low } from '../assets/icons/severity/low.svg'
import { ReactComponent as NotApplicableUnknown } from '../assets/icons/notApplicableSeverity/unknown.svg'
import { ReactComponent as NotApplicableCritical } from '../assets/icons/notApplicableSeverity/critical.svg'
import { ReactComponent as NotApplicableHigh } from '../assets/icons/notApplicableSeverity/high.svg'
import { ReactComponent as NotApplicableMedium } from '../assets/icons/notApplicableSeverity/medium.svg'
import { ReactComponent as NotApplicableLow } from '../assets/icons/notApplicableSeverity/low.svg'

import { Tooltip } from '@mui/material'

export function getSeverityImage(
	severity: ISeverity,
	width = 24,
	isNotApplicable?: boolean
): JSX.Element {
	let icon: JSX.Element

	switch (severity) {
		case ISeverity.Unknown:
			icon = isNotApplicable ? (
				<NotApplicableUnknown style={{ width: width }} id="unknown" />
			) : (
				<Unknown style={{ width: width }} id="unknown" />
			)
			break
		case ISeverity.Low:
			icon = isNotApplicable ? (
				<NotApplicableLow style={{ width: width }} id="low" />
			) : (
				<Low style={{ width: width }} id="low" />
			)
			break
		case ISeverity.Medium:
			icon = isNotApplicable ? (
				<NotApplicableMedium style={{ width: width }} id="medium" />
			) : (
				<Medium style={{ width: width }} id="medium" />
			)
			break
		case ISeverity.High:
			icon = isNotApplicable ? (
				<NotApplicableHigh style={{ width: width }} id="high" />
			) : (
				<High style={{ width: width }} id="high" />
			)
			break
		case ISeverity.Critical:
			icon = isNotApplicable ? (
				<NotApplicableCritical style={{ width: width }} id="critical" />
			) : (
				<Critical style={{ width: width }} id="critical" />
			)
			break
	}

	return (
		<Tooltip title={severity} placement="bottom" arrow>
			{icon}
		</Tooltip>
	)
}

let globalNodeNumber = 0

export function toTreeNode(impactGraph: IImpactGraphNode): TreeNode {
	globalNodeNumber = 0
	return toTreeNodeHelper(impactGraph)
}

function toTreeNodeHelper(impactGraph: IImpactGraphNode): TreeNode {
	const node = new TreeNode(`${++globalNodeNumber}-${impactGraph.name}`, impactGraph.name)

	if (impactGraph.children === undefined || impactGraph.children.length === 0) {
		node.className = css.redNode
		return node
	}

	impactGraph.children.forEach(child => {
		node.addChild(toTreeNodeHelper(child))
	})
	return node
}
