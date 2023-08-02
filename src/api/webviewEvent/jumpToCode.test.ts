import { WebviewEventType } from '..'
import { IAnalysisStep } from '../../model/analysisStep'
import { WebviewEventJumpToCode } from './jumpToCode'

describe('Event Types', () => {
	test('defines IdeEventType enum correctly', () => {
		expect(WebviewEventType.JumpToCode).toEqual('JUMP_TO_CODE')
	})

	test('defines JumpToCodeEvent interface correctly', () => {
		const eventData: WebviewEventJumpToCode = {
			type: WebviewEventType.JumpToCode,
			data: { file: 'file' } as IAnalysisStep
		}

		expect(eventData.type).toEqual(WebviewEventType.JumpToCode)
		expect(eventData.data).toBeDefined()
	})
})
