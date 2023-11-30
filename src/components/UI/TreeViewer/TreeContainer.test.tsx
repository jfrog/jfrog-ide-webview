import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TreeContainer, { Props } from './TreeContainer'
import { TreeNode } from '../../../model/treeNode'

describe('TreeContainer component', () => {
	test('renders the component with the provided root node', () => {
		const root: TreeNode = new TreeNode('root', 'Root Node')

		const props: Props = {
			root: root
		}

		render(<TreeContainer {...props} />)

		// Check if the root node is rendered
		expect(screen.getByText('Root Node')).toBeInTheDocument()
	})

	test('handles filter change correctly', async () => {
		const root: TreeNode = new TreeNode('root', 'Root Node')
		const visible: TreeNode = new TreeNode('visibleNode', 'VisibleNode')
		const hidden: TreeNode = new TreeNode('hiddenNode', 'HiddenNode')
		root.addChild(visible)
		root.addChild(hidden)

		const props: Props = {
			root: root
		}

		render(<TreeContainer {...props} />)

		// Find the filter input element
		const filterInput = screen.getByRole('textbox')
		// Type a filter value
		userEvent.type(filterInput, 'Visible')

		// Check if the filter value is updated correctly
		expect(filterInput).toHaveValue('Visible')

		// Find the filtered node in the tree viewer
		const filteredNode = screen.getByText('VisibleNode')
		// Check if the filtered node is rendered
		expect(filteredNode).toBeInTheDocument()

		// Check that the filter node is not render
		await waitFor(() => {
			expect(screen.queryByText('HiddenNode')).not.toBeInTheDocument()
		})
	})

	test('handles activeNode change correctly', async () => {
		const root: TreeNode = new TreeNode('root', 'Root Node')
		const visible: TreeNode = new TreeNode('visibleNode', 'Visible Node')
		const hidden: TreeNode = new TreeNode('hiddenNode', 'Hidden Node')
		root.addChild(visible)
		root.addChild(hidden)
		const props: Props = {
			root: root
		}

		render(<TreeContainer {...props} />)

		// Find a node in the tree viewer
		const node = screen.getByText('Visible Node')
		// Click on the node
		userEvent.click(node)
		await waitFor(() => {
			expect(screen.queryByText('Root Node')).not.toBeInTheDocument()
		})
	})

	test('shows a note about the tree being partial', () => {
		const root: TreeNode = new TreeNode('root', 'Root Node')
		const props: Props = {
			root: root,
			pathsLimit: 10
		}

		render(<TreeContainer {...props} />)

		expect(
			screen.getByText(
				'Graph size limit reached. The Impact Graph shows only 10 paths to this dependency.'
			)
		).toBeInTheDocument()
	})

	test('does not show a note about the tree being partial', () => {
		const root: TreeNode = new TreeNode('root', 'Root Node')
		const props: Props = {
			root: root,
			pathsLimit: -1
		}

		render(<TreeContainer {...props} />)

		expect(
			screen.queryByText(
				'Graph size limit reached. The Impact Graph shows only 10 paths to this dependency.'
			)
		).not.toBeInTheDocument()
	})
})
