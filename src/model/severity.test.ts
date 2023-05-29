import { ISeverity } from './severity'

describe('Model - ISeverity', () => {
	test('should have the correct enum values', () => {
		// Assert the enum values
		expect(ISeverity.Unknown).toBe('Unknown')
		expect(ISeverity.Low).toBe('Low')
		expect(ISeverity.Medium).toBe('Medium')
		expect(ISeverity.High).toBe('High')
		expect(ISeverity.Critical).toBe('Critical')
	})
})
