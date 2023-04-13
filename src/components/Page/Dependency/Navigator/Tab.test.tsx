import { render, screen } from '@testing-library/react'
import { ActiveTab } from '../../../../model'
import Tab from './Tab'
describe('Tab component', () => {
	test('Renders three tabs', () => {
		const FirstTab = 'First-Tab'
		const SecondTab = 'Second-Tab'
		const ThirdTab = 'Third-Tab'
		// Arrange
		render(
			<Tab
				tabs={[
					{ text: FirstTab, hide: false, tabKey: ActiveTab.ImpactGraph },
					{ text: SecondTab, hide: false, tabKey: ActiveTab.ImpactGraph },
					{ text: ThirdTab, hide: false, tabKey: ActiveTab.ImpactGraph }
				]}
				activeTab={ActiveTab.ImpactGraph}
				onChangeMenu={(i): ActiveTab => i}
			/>
		)
		// Assert
		let tabElement = screen.getByText(FirstTab)
		expect(tabElement).toBeInTheDocument()
		tabElement = screen.getByText(SecondTab)
		expect(tabElement).toBeInTheDocument()
		tabElement = screen.getByText(ThirdTab)
		expect(tabElement).toBeInTheDocument()
	})

	test('Renders two tabs and hides the third', () => {
		const FirstTab = 'First-Tab'
		const SecondTab = 'Second-Tab'
		const ThirdTab = 'Third-Tab'
		// Arrange
		render(
			<Tab
				tabs={[
					{ text: FirstTab, hide: false, tabKey: ActiveTab.ImpactGraph },
					{ text: SecondTab, hide: true, tabKey: ActiveTab.ImpactGraph },
					{ text: ThirdTab, hide: false, tabKey: ActiveTab.ImpactGraph }
				]}
				activeTab={ActiveTab.ImpactGraph}
				onChangeMenu={(i): ActiveTab => i}
			/>
		)
		// Assert
		const tabElement = screen.getByText(FirstTab)
		expect(tabElement).toBeInTheDocument()
		const secondTabElement = screen.queryByText(SecondTab)
		expect(secondTabElement).not.toBeInTheDocument()
		const thirdTabElement = screen.getByText(ThirdTab)
		expect(thirdTabElement).toBeInTheDocument()
	})
})
