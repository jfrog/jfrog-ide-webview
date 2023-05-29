import { IAnalysisStep } from '../model/analysisStep'
import { IdeEvent, IdeEventType, JumpToCodeEvent } from './ideEvent'

describe('Event Types', () => {
	test('defines IdeEventType enum correctly', () => {
		expect(IdeEventType.JUMP_TO_CODE).toEqual('SHOW_CODE')
	})

	test('defines JumpToCodeEvent interface correctly', () => {
		const eventData: JumpToCodeEvent = {
			type: IdeEventType.JUMP_TO_CODE,
			data: { file: 'file' } as IAnalysisStep
		}

		expect(eventData.type).toEqual(IdeEventType.JUMP_TO_CODE)
		expect(eventData.data).toBeDefined()
	})

	test('defines IdeEvent union type correctly', () => {
		const event: IdeEvent = {
			type: IdeEventType.JUMP_TO_CODE,
			data: { file: 'file' } as IAnalysisStep
		}

		expect(event.type).toEqual(IdeEventType.JUMP_TO_CODE)
		expect(event.data).toBeDefined()
	})
})
