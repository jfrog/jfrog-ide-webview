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
})
