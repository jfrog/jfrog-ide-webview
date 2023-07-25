import { IdeEventType } from '..'
import { IDependencyPage } from '../../model/webviewPages'
import { IdeEventShowPage } from './showPage'

describe('Event Types', () => {
	test('defines webviewEventType enum correctly', () => {
		expect(IdeEventType.SetEmitter).toEqual('SET_EMITTER')
	})

	test('defines ShowPageEvent interface correctly', () => {
		const eventData: IdeEventShowPage = {
			type: IdeEventType.ShowPage,
			data: {} as IDependencyPage
		}

		expect(eventData.type).toEqual(IdeEventType.ShowPage)
		expect(eventData.data).toBeDefined()
	})

	test('defines WebviewEvent union type correctly', () => {
		const event: IdeEventShowPage = {
			type: IdeEventType.ShowPage,
			data: {} as IDependencyPage
		}

		expect(event.type).toEqual(IdeEventType.ShowPage)
		expect(event.data).toBeDefined()
	})
})
