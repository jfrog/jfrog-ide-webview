import { IImpactGraphNode, ISeverity } from '../model'
import { TreeNode } from '../model/treeNode'
import css from '../components/UI/TreeViewer/TreeViewer.module.css'

import { ReactComponent as UnknownFilled } from '../assets/icons/severity/unknown_filled.svg'
import { ReactComponent as Unknown } from '../assets/icons/severity/unknown.svg'
import { ReactComponent as CriticalFilled } from '../assets/icons/severity/critical_filled.svg'
import { ReactComponent as Critical } from '../assets/icons/severity/critical.svg'
import { ReactComponent as HighFilled } from '../assets/icons/severity/high_filled.svg'
import { ReactComponent as High } from '../assets/icons/severity/high.svg'
import { ReactComponent as MediumFilled } from '../assets/icons/severity/medium_filled.svg'
import { ReactComponent as Medium } from '../assets/icons/severity/medium.svg'
import { ReactComponent as LowFilled } from '../assets/icons/severity/low_filled.svg'
import { ReactComponent as Low } from '../assets/icons/severity/low.svg'
import { Tooltip } from '@mui/material'

export function getSeverityImage(severity: ISeverity, filled = false, width = 24): JSX.Element {
	let icon: JSX.Element

	switch (severity) {
		case ISeverity.Unknown:
			icon = filled ? (
				<UnknownFilled style={{ width: width }} id="unkown" />
			) : (
				<Unknown style={{ width: width }} id="unkown" />
			)
			break
		case ISeverity.Low:
			icon = filled ? (
				<LowFilled style={{ width: width }} id="low" />
			) : (
				<Low style={{ width: width }} id="low" />
			)
			break
		case ISeverity.Medium:
			icon = filled ? (
				<MediumFilled style={{ width: width }} id="medium" />
			) : (
				<Medium style={{ width: width }} id="medium" />
			)
			break
		case ISeverity.High:
			icon = filled ? (
				<HighFilled style={{ width: width }} id="high" />
			) : (
				<High style={{ width: width }} id="high" />
			)
			break
		case ISeverity.Critical:
			icon = filled ? (
				<CriticalFilled style={{ width: width }} id="critical" />
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
