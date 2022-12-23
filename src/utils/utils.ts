import { ISeverity } from '../model/severity'
import severityLowImg from './../assets/Low.svg'
import Unknown from './../assets/Unknown.svg'
import severityMediumImg from './../assets/Medium.svg'
import high from './../assets/High.svg'
import critical from './../assets/Critical.svg'
import notApplicable from './../assets/Not_Applicable.svg'
import applicable from './../assets/Applicable.svg'
import { Queue } from '../utils/queue'
import { TreeNode } from '../model/treeNode'
import { IImpactedPath } from '../model/impactedPath'
export const getSeverityImage = (severity: ISeverity) => {
	switch (severity) {
		case ISeverity.Unknown:
			return Unknown
		case ISeverity.Low:
			return severityLowImg
		case ISeverity.Medium:
			return severityMediumImg
		case ISeverity.High:
			return high
		case ISeverity.Critical:
			return critical
	}
}

export const getApplicabilityImg = (isApplicable: boolean) => {
	if (isApplicable) {
		return applicable
	}
	return notApplicable
}

export const toTreeNode = (impactedPath: IImpactedPath) => {
	const impactedPathQueue = new Queue<IImpactedPath>()
	const treeNodeQueue = new Queue<TreeNode>()
	impactedPathQueue.enqueue(impactedPath)
	let id = 0
	const root = new TreeNode(`${id++}-${impactedPath.name}`, impactedPath.name)
	let tmpImpactedPath: IImpactedPath|undefined
	let tmpTreeNode: TreeNode|undefined
	treeNodeQueue.enqueue(root)
	while (impactedPathQueue.size() > 0) {
		tmpImpactedPath = impactedPathQueue.dequeue()
		tmpTreeNode = treeNodeQueue.dequeue()
		if (!tmpImpactedPath || !tmpTreeNode) {
			continue
		}
		tmpImpactedPath.children?.forEach(child => {
			const rootChild = new TreeNode(`${id++}-${child.name}`, child.name)
			tmpTreeNode?.children.push(rootChild)
			impactedPathQueue.enqueue(child)
			treeNodeQueue.enqueue(rootChild)
		})
	}
	return root
}