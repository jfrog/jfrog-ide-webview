import { IdeEventType } from '..'
import { IdeEventSetEmitter } from './setEmitter'

describe('Event Types', () => {
	test('defines webviewEventType enum correctly', () => {
		expect(IdeEventType.SetEmitter).toEqual('SET_EMITTER')
	})

	test('defines SetEmitterEvent interface correctly', () => {
		const eventData: IdeEventSetEmitter = {
			type: IdeEventType.SetEmitter,
			data: 'exampleEmitterFunc'
		}

		expect(eventData.type).toEqual(IdeEventType.SetEmitter)
		expect(eventData.data).toEqual('exampleEmitterFunc')
	})
})
