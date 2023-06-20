import { WebviewReceiveEventType } from '..'
import { IDependencyPage } from '../../model/webviewPages'
import { ReceiveShowPageEvent } from './showPage'

describe('Event Types', () => {
	test('defines webviewEventType enum correctly', () => {
		expect(WebviewReceiveEventType.SetEmitter).toEqual('SET_EMITTER')
	})

	test('defines ShowPageEvent interface correctly', () => {
		const eventData: ReceiveShowPageEvent = {
			type: WebviewReceiveEventType.ShowPage,
			pageData: {} as IDependencyPage
		}

		expect(eventData.type).toEqual(WebviewReceiveEventType.ShowPage)
		expect(eventData.pageData).toBeDefined()
	})

	test('defines WebviewEvent union type correctly', () => {
		const event: ReceiveShowPageEvent = {
			type: WebviewReceiveEventType.ShowPage,
			pageData: {} as IDependencyPage
		}

		expect(event.type).toEqual(WebviewReceiveEventType.ShowPage)
		expect(event.pageData).toBeDefined()
	})
})
