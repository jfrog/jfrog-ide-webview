import { render } from '@testing-library/react'
import ContextualAnalysis from './ContextualAnalysis'

describe('ContextualAnalysis component', () => {
	test('renders found text when provided', () => {
		const foundText = 'Found text example'
		const { getByText } = render(<ContextualAnalysis foundText={foundText} />)
		expect(getByText(foundText)).toBeInTheDocument()
	})

	test('renders analysis steps when provided', () => {
		const analysisSteps = [
			{
				file: '/a/b/c/example.js',
				fileName: 'example.js',
				startRow: 1,
				startColumn: 5,
				endRow: 1,
				endColumn: 10
			}
		]
		const { getByText } = render(<ContextualAnalysis analysisSteps={analysisSteps} />)
		expect(getByText('DATA FLOW ANALYSIS')).toBeInTheDocument()
		analysisSteps.forEach(step => {
			const analysisStepElement = getByText(`${step.fileName} ${step.startRow}:`)
			expect(analysisStepElement).toBeInTheDocument()
		})
	})

	test('does not render analysis steps when not provided', () => {
		const { queryByText } = render(<ContextualAnalysis />)
		const analysisStepsElement = queryByText('DATA FLOW ANALYSIS')
		expect(analysisStepsElement).toBeNull()
	})
})
