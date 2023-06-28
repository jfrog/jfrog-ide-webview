import { WebviewSendEventType } from '..'
import { IAnalysisStep } from '../../model/analysisStep'
import { SendJumpToCodeEvent } from './jumpToCode'

describe('Event Types', () => {
	test('defines IdeEventType enum correctly', () => {
		expect(WebviewSendEventType.JumpToCode).toEqual('SHOW_CODE')
	})

	test('defines JumpToCodeEvent interface correctly', () => {
		const eventData: SendJumpToCodeEvent = {
			type: WebviewSendEventType.JumpToCode,
			data: { file: 'file' } as IAnalysisStep
		}

		expect(eventData.type).toEqual(WebviewSendEventType.JumpToCode)
		expect(eventData.data).toBeDefined()
	})
})
