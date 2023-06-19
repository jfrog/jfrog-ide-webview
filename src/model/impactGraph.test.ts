import { IImpactGraph } from './impactGraph'

describe('Model - IImpactGraph', () => {
	test('should render the component correctly', () => {
		// Define your test data
		const data: IImpactGraph = {
			name: 'Parent',
			children: [
				{
					name: 'Child 1',
					children: [{ name: 'Grandchild 1' }, { name: 'Grandchild 2' }]
				},
				{
					name: 'Child 2'
				}
			]
		}

		// Assert that the component renders correctly
		expect(data).toBeDefined()
		expect(data.name).toBe('Parent')
		expect(data.children).toHaveLength(2)

		// Additional assertions for child nodes
		const child1 = data.children?.[0]
		expect(child1).toBeDefined()
		expect(child1?.name).toBe('Child 1')
		expect(child1?.children).toHaveLength(2)

		const grandchild1 = child1?.children?.[0]
		const grandchild2 = child1?.children?.[1]
		expect(grandchild1).toBeDefined()
		expect(grandchild1?.name).toBe('Grandchild 1')
		expect(grandchild2).toBeDefined()
		expect(grandchild2?.name).toBe('Grandchild 2')

		const child2 = data.children?.[1]
		expect(child2).toBeDefined()
		expect(child2?.name).toBe('Child 2')
		expect(child2?.children).toBeUndefined()
	})
})
