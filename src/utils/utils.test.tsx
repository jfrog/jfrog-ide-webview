import { CustomTreeNodeData, TreeNode } from '../model/treeNode'
import { getApplicabilityImg, toTreeNode } from './utils'

describe('Utils', () => {
	test('should convert the impact graph to a tree node with 0 children', () => {
		const mockImpactGraph = {
			name: 'Root',
			children: []
		}
		const expectedResult = new TreeNodeTest('1-Root', 'Root', { className: 'redNode' })
		const result = toTreeNode(mockImpactGraph)
		expect(result).toEqual(expectedResult)
	})

	test('should convert the impact graph to a tree node with 1 children', () => {
		const mockImpactGraph = {
			name: 'Root',
			children: [{ name: 'Child 1' }]
		}
		const expectedRoot = new TreeNodeTest('1-Root', 'Root')
		const expectedChild = new TreeNodeTest('2-Child 1', 'Child 1', { className: 'redNode' })
		expectedRoot.addChild(expectedChild)
		const result = toTreeNode(mockImpactGraph)
		expect(result).toEqual(expectedRoot)
	})

	test('should convert the impact graph to a tree node with 1 children and 1 grandchild', () => {
		const mockImpactGraph = {
			name: 'Root',
			children: [{ name: 'Child 1', children: [{ name: 'Grandchild 1' }] }]
		}
		const expectedRoot = new TreeNodeTest('1-Root', 'Root')
		const expectedChild = new TreeNodeTest('2-Child 1', 'Child 1')
		const expectedGrandchild = new TreeNodeTest('3-Grandchild 1', 'Grandchild 1', {
			className: 'redNode'
		})
		expectedChild.addChild(expectedGrandchild)
		expectedRoot.addChild(expectedChild)

		const result = toTreeNode(mockImpactGraph)
		expect(result).toEqual(expectedRoot)
	})

	test('should convert the impact graph to a tree node with 2 children and 1 grandchild', () => {
		const mockImpactGraph = {
			name: 'Root',
			children: [{ name: 'Child 1', children: [{ name: 'Grandchild 1' }] }, { name: 'Child 2' }]
		}
		const expectedRoot = new TreeNodeTest('1-Root', 'Root')
		const expectedChild1 = new TreeNodeTest('2-Child 1', 'Child 1')
		const expectedChild2 = new TreeNodeTest('4-Child 2', 'Child 2', { className: 'redNode' })
		const expectedGrandchild = new TreeNodeTest('3-Grandchild 1', 'Grandchild 1', {
			className: 'redNode'
		})
		expectedChild1.addChild(expectedGrandchild)
		expectedRoot.addChild(expectedChild1)
		expectedRoot.addChild(expectedChild2)
		const result = toTreeNode(mockImpactGraph)
		expect(result).toEqual(expectedRoot)
	})

	test('should return the applicable SVG when isApplicable is true', () => {
		const isApplicable = true
		const result = getApplicabilityImg(isApplicable)
		expect(result.type).toBe('svg')
	})

	test('should return the non-applicable SVG when isApplicable is false', () => {
		const isApplicable = false
		const result = getApplicabilityImg(isApplicable)
		expect(result.type).toBe('svg')
	})
})

/**
 * By extending the TreeNode class and providing an additional constructor,
 * allows for the creation of tree nodes with custom data,
 * providing flexibility and customization options when working with tree structures.
 */
class TreeNodeTest extends TreeNode {
	constructor(id: string, name: string, data?: CustomTreeNodeData | undefined) {
		super(id, name)
		this._gProps = data
	}
}
