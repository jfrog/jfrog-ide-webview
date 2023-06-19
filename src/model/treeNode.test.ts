import { buildSubTree, getSelectedNodeSubTree } from '../components/UI/TreeViewer/TreeViewer'
import { TreeNode } from './treeNode'

describe('TreeNode', () => {
	let treeNode: TreeNode

	beforeEach(() => {
		treeNode = new TreeNode('1', 'Node 1')
	})

	test('should set and get id correctly', () => {
		expect(treeNode.id).toBe('1')

		treeNode.id = '2'
		expect(treeNode.id).toBe('2')
	})

	test('should set and get children correctly', () => {
		const childNode1 = new TreeNode('2', 'Node 2')
		const childNode2 = new TreeNode('3', 'Node 3')

		treeNode.addChild(childNode1)
		expect(treeNode.children).toContain(childNode1)

		treeNode.children = [childNode2]
		expect(treeNode.children).toEqual([childNode2])
	})

	test('should update tree dimensions correctly', () => {
		const childNode1 = new TreeNode('2', 'Node 2')
		const childNode2 = new TreeNode('3', 'Node 3')

		treeNode.addChild(childNode1)
		expect(treeNode.height).toBe(2)
		expect(treeNode.width).toBe(1)

		childNode1.addChild(childNode2)
		treeNode.addChild(childNode1)
		expect(treeNode.height).toBe(3)
		expect(treeNode.width).toBe(2)
	})

	test('should set and get className correctly', () => {
		const className = 'custom-class'
		treeNode.className = className
		expect(treeNode.gProps).toEqual({ className })
	})

	const treeNode1: TreeNode = new TreeNode('1', 'Node 1')
	const treeNode2: TreeNode = new TreeNode('2', 'Node 2')
	const treeNode3: TreeNode = new TreeNode('3', 'Node 3')
	const treeNode4: TreeNode = new TreeNode('4', 'Node 4')

	treeNode1.addChild(treeNode2)
	treeNode2.addChild(treeNode3)
	treeNode2.addChild(treeNode4)

	describe('getSelectedNodeSubTree', () => {
		const selectedNode: TreeNode = treeNode1
		test('returns the selected node if its ID matches the active node', () => {
			const activeNode = '1'
			const result = getSelectedNodeSubTree(selectedNode, activeNode)
			expect(result).toBe(selectedNode)
		})

		test('returns undefined if the selected node has no children', () => {
			const activeNode = '5'
			const result = getSelectedNodeSubTree(treeNode3, activeNode)
			expect(result).toBeUndefined()
		})

		test('returns the selected node subtree if a child matches the active node', () => {
			const activeNode = '4'
			const result = getSelectedNodeSubTree(selectedNode, activeNode)
			expect(result).toBe(treeNode4)
		})

		test('returns undefined if no node in the subtree matches the active node', () => {
			const activeNode = '5'
			const result = getSelectedNodeSubTree(selectedNode, activeNode)
			expect(result).toBeUndefined()
		})
	})

	describe('buildSubTree', () => {
		const root: TreeNode = treeNode1

		test('returns the root if there is no filter', () => {
			const result = buildSubTree(root, '')
			expect(result).toBe(root)
		})

		test('returns the root if it matches the filter', () => {
			const result = buildSubTree(root, '1')
			expect(result).toBe(root)
		})

		test('returns undefined if the root and its children do not match the filter', () => {
			const result = buildSubTree(root, '5')
			expect(result).toBeUndefined()
		})

		test('returns the root with filtered children if at least one child matches the filter', () => {
			const result = buildSubTree(root, '3')
			expect(result).toBe(root)
			expect(result?.children).toHaveLength(1)
			expect(result?.children[0]).toBe(treeNode2)
			expect(result?.children[0].children).toHaveLength(1)
			expect(result?.children[0].children[0]).toBe(treeNode3)
		})
	})
})
