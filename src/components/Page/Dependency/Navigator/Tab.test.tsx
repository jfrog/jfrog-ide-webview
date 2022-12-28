import { render, screen } from '@testing-library/react'
import { ActiveTab } from '../../../../model'
import Tab from './Tab'
describe('Tab component', () => {
	test('renders three tabs', () => {
		const FirstTab = 'First-Tab'
		const SecondTab = 'Second-Tab'
		const ThirdTab = 'Third-Tab'
		// Arrange
		render(<Tab tabs={[{ text: FirstTab, hide: false, tabKey: ActiveTab.ImpactedPath }, { text: SecondTab, hide: false, tabKey: ActiveTab.ImpactedPath }, { text: ThirdTab, hide: false, tabKey: ActiveTab.ImpactedPath }]} activeTab={ActiveTab.ImpactedPath} onChangeMenu={i => i}/>)
		// Assert
		let tabElement = screen.getByText(FirstTab)
		expect(tabElement).toBeInTheDocument()
		tabElement = screen.getByText(SecondTab)
		expect(tabElement).toBeInTheDocument()
		tabElement = screen.getByText(ThirdTab)
		expect(tabElement).toBeInTheDocument()
	})

	test('renders two tabs and hides the third', () => {
		const FirstTab = 'First-Tab'
		const SecondTab = 'Second-Tab'
		const ThirdTab = 'Third-Tab'
		// Arrange
		render(<Tab tabs={[{ text: FirstTab, hide: false, tabKey: ActiveTab.ImpactedPath }, { text: SecondTab, hide: true, tabKey: ActiveTab.ImpactedPath }, { text: ThirdTab, hide: false, tabKey: ActiveTab.ImpactedPath }]} activeTab={ActiveTab.ImpactedPath} onChangeMenu={i => i}/>)
		// Assert
		const tabElement = screen.getByText(FirstTab)
		expect(tabElement).toBeInTheDocument()
		const secondTabElement = screen.queryByText(SecondTab)
		expect(secondTabElement).not.toBeInTheDocument()
		const thirdTabElement = screen.getByText(ThirdTab)
		expect(thirdTabElement).toBeInTheDocument()
	})
})