import { IDependencyPage } from '../model/webviewPages'
import { webviewEventType, ShowPageEvent, SetEmitterEvent, WebviewEvent } from './webviewEvent'

describe('Event Types', () => {
	test('defines webviewEventType enum correctly', () => {
		expect(webviewEventType.SetEmitter).toEqual('SET_EMITTER')
		expect(webviewEventType.ShowPage).toEqual('SHOW_DATA')
	})

	test('defines ShowPageEvent interface correctly', () => {
		const eventData: ShowPageEvent = {
			type: webviewEventType.ShowPage,
			pageData: {} as IDependencyPage
		}

		expect(eventData.type).toEqual(webviewEventType.ShowPage)
		expect(eventData.pageData).toBeDefined()
	})

	test('defines SetEmitterEvent interface correctly', () => {
		const eventData: SetEmitterEvent = {
			type: webviewEventType.SetEmitter,
			emitterFunc: 'exampleEmitterFunc'
		}

		expect(eventData.type).toEqual(webviewEventType.SetEmitter)
		expect(eventData.emitterFunc).toEqual('exampleEmitterFunc')
	})

	test('defines WebviewEvent union type correctly', () => {
		const event: WebviewEvent = {
			type: webviewEventType.ShowPage,
			pageData: {} as IDependencyPage
		}

		expect(event.type).toEqual(webviewEventType.ShowPage)
		expect(event.pageData).toBeDefined()
	})
})
