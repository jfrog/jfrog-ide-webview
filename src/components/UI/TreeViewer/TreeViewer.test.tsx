import { render, screen, waitFor } from '@testing-library/react'
import TreeViewer, { Props } from './TreeViewer'
import { TreeNode } from '../../../model/treeNode'

describe('TreeViewer component', () => {
	const handleClickMock = jest.fn()

	const root: TreeNode = new TreeNode('0-root', 'Root')
	const child1: TreeNode = new TreeNode('1-child 1.1', 'child 1.1')
	const child2: TreeNode = new TreeNode('2-child 2.1', 'child 2.1')
	root.addChild(child1)
	root.addChild(child2)

	const props: Props = {
		activeNode: '',
		filter: '',
		root: root,
		handleClick: handleClickMock
	}

	afterEach(() => {
		handleClickMock.mockClear()
	})

	test('renders the tree correctly', () => {
		render(<TreeViewer {...props} />)

		// Check if the root node is rendered
		const rootNode = screen.getByText('Root')
		expect(rootNode).toBeInTheDocument()

		// Check if the child nodes are rendered
		const child1Node = screen.getByText('child 1.1')
		expect(child1Node).toBeInTheDocument()

		const child2Node = screen.getByText('child 2.1')
		expect(child2Node).toBeInTheDocument()
	})

	test('filters nodes based on the filter prop', async () => {
		const filter = 'child 1.1'
		const filteredProps: Props = {
			activeNode: '',
			filter: filter,
			root: root,
			handleClick: handleClickMock
		}

		render(<TreeViewer {...filteredProps} />)

		// Check if the root node is rendered
		const rootNode = screen.getByText('Root')
		expect(rootNode).toBeInTheDocument()

		// Check if the child nodes matching the filter are rendered
		const filteredChildNode = screen.getByText('child 1.1')
		expect(filteredChildNode).toBeInTheDocument()

		// Check if the child nodes not matching the filter are not rendered
		await waitFor(() => {
			const nonFilteredChildNode = screen.queryByText('child 2.1')
			expect(nonFilteredChildNode).toBeNull()
		})
	})
})
