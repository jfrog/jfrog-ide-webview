import { render, fireEvent } from '@testing-library/react'
import AnalysisStepsListElement, { Props } from './AnalysisStepsListElement'
import { eventManagerContext } from '../../../store/eventContext'
import { EventManager } from '../../../api/eventManager'

describe('AnalysisStepsListElement component', () => {
	const mockJumpToCode = jest.fn()
	const mockEventManager = new EventManager(mockJumpToCode)

	const defaultProps: Props = {
		items: [
			{
				file: 'example.js',
				fileName: 'Example File',
				startRow: 1,
				startColumn: 2,
				endRow: 5,
				endColumn: 8,
				snippet: 'console.log("Hello, world!");'
			},
			{
				file: 'test.js',
				fileName: 'Test File',
				startRow: 10,
				startColumn: 3,
				endRow: 12,
				endColumn: 6
			}
		]
	}

	test('renders analysis steps list element with buttons', () => {
		const { getAllByRole, getByText } = render(
			<eventManagerContext.Provider value={mockEventManager}>
				<AnalysisStepsListElement {...defaultProps} />
			</eventManagerContext.Provider>
		)

		const buttons = getAllByRole('button')

		// Assert that the correct number of buttons is rendered
		expect(buttons).toHaveLength(defaultProps.items.length)

		// Assert that the button content is rendered correctly
		expect(getByText('Example File1:')).toBeInTheDocument()
		expect(getByText('Test File10:')).toBeInTheDocument()
	})

	test('calls jumpToCode when button is clicked', () => {
		const consoleLogSpy = jest.spyOn(global.console, 'log')

		const { getAllByRole } = render(
			<eventManagerContext.Provider value={mockEventManager}>
				<AnalysisStepsListElement {...defaultProps} />
			</eventManagerContext.Provider>
		)

		const buttons = getAllByRole('button')

		// Click the first button
		fireEvent.click(buttons[0])

		// Assert that jumpToCode is called with the correct argument
		expect(consoleLogSpy).toHaveBeenCalledWith({
			data: defaultProps.items[0],
			type: 'JUMP_TO_CODE'
		})
	})
})
