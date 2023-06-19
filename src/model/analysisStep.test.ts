import { IAnalysisStep } from './analysisStep'

describe('Model - IAnalysisStep', () => {
	test('defines the interface with all required properties', () => {
		const analysisStep: IAnalysisStep = {
			file: 'example.js',
			startRow: 1,
			startColumn: 5,
			endRow: 3,
			endColumn: 10
		}

		expect(analysisStep.file).toEqual('example.js')
		expect(analysisStep.startRow).toEqual(1)
		expect(analysisStep.startColumn).toEqual(5)
		expect(analysisStep.endRow).toEqual(3)
		expect(analysisStep.endColumn).toEqual(10)

		// Optional properties
		expect(analysisStep.fileName).toBeUndefined()
		expect(analysisStep.snippet).toBeUndefined()
	})
})
