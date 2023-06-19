import { ActiveTab, ITab } from './tab'

describe('Model - ITab', () => {
	test('should have the correct properties', () => {
		// Create a sample tab object
		const tab: ITab = {
			tabKey: ActiveTab.None,
			text: 'Sample Tab',
			hide: false
		}

		// Assert the properties
		expect(tab.tabKey).toBe(ActiveTab.None)
		expect(tab.text).toBe('Sample Tab')
		expect(tab.hide).toBe(false)
	})
})

test('should have the correct enum values', () => {
	// Assert the enum values
	expect(ActiveTab.None).toBe('None')
	expect(ActiveTab.Research).toBe('research')
	expect(ActiveTab.ContextualAnalysis).toBe('contextualAnalysis')
	expect(ActiveTab.PublicSources).toBe('publicSources')
	expect(ActiveTab.ImpactGraph).toBe('impactGraph')
	expect(ActiveTab.Reference).toBe('reference')
})
