import { render, screen, fireEvent } from '@testing-library/react'
import Tab, { Props } from './Tab'
import { ActiveTab, ITab } from '../../../../model/tab'

describe('Tab component', () => {
	const mockTabs: ITab[] = [
		{ text: 'Tab 1', tabKey: ActiveTab.Research, hide: false },
		{ text: 'Tab 2', tabKey: ActiveTab.ContextualAnalysis, hide: false },
		{ text: 'Tab 3', tabKey: ActiveTab.PublicSources, hide: true }
	]

	const props: Props = {
		tabs: mockTabs,
		activeTab: ActiveTab.ContextualAnalysis,
		onChangeMenu: jest.fn()
	}
	test('renders two tabs', () => {
		render(<Tab {...props} />)

		mockTabs.forEach(tab => {
			if (!tab.hide) {
				const tabElement = screen.getByText(tab.text)
				expect(tabElement).toBeInTheDocument()
			}
		})
	})

	test('renders the component with tabs and highlights the active tab', () => {
		render(<Tab {...props} />)

		// Check if the component renders the correct number of tabs
		const tabButtons = screen.getAllByRole('button')
		expect(tabButtons).toHaveLength(2)

		// Check if the active tab is highlighted
		const tab2Button = screen.getByText('Tab 1')
		expect(tab2Button).not.toHaveClass('btnHover')

		const tab1Button = screen.getByText('Tab 2')
		expect(tab1Button).toHaveClass('btnHover')
	})

	test('handles tab click and calls the onChangeMenu callback with the selected tab key', () => {
		const mockOnChangeMenu = jest.fn()
		const props: Props = {
			tabs: mockTabs,
			activeTab: ActiveTab.Research,
			onChangeMenu: mockOnChangeMenu
		}

		render(<Tab {...props} />)

		// Find and click on the second tab
		const tab2Button = screen.getByText('Tab 1')
		fireEvent.click(tab2Button)

		// Check if the onChangeMenu callback is called with the correct tab key
		expect(mockOnChangeMenu).toHaveBeenCalledTimes(1)
		expect(mockOnChangeMenu).toHaveBeenCalledWith(ActiveTab.Research)
	})

	test('does not render hidden tabs', () => {
		const props: Props = {
			tabs: mockTabs,
			activeTab: ActiveTab.Research,
			onChangeMenu: jest.fn()
		}

		render(<Tab {...props} />)

		// Check if the hidden tab is not rendered
		expect(screen.queryByText('Tab 3')).not.toBeInTheDocument()
	})
})
