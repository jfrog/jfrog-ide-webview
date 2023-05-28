import { IPageData, sendWebviewPage } from '../utils/testUtils'
import { EventManager } from './eventManager'
import { webviewEventType } from './webviewEvent'

describe('EventManager util', () => {
	let setPageStateMock: jest.Mock
	let manager: EventManager
	beforeEach(() => {
		setPageStateMock = jest.fn()
		manager = new EventManager(setPageStateMock)
	})

	afterEach(() => {
		jest.restoreAllMocks()
	})

	test('sets the event receiver and handles ShowPage event', () => {
		const pageData = {
			type: webviewEventType.ShowPage,
			pageData: { title: 'Test Page' }
		}
		sendWebviewPage(pageData)

		expect(setPageStateMock).toHaveBeenCalledTimes(1)
		expect(setPageStateMock).toHaveBeenCalledWith({ title: 'Test Page' })
	})

	test('sets the event receiver and handles the SetEmitter event with the correct data', () => {
		const consoleLogSpy = jest.spyOn(global.console, 'warn')
		const emitterFunc = 'return console.warn'
		const setEmitterEvent = {
			type: webviewEventType.SetEmitter,
			emitterFunc
		} as IPageData

		sendWebviewPage(setEmitterEvent)

		const data = {
			file: 'file-example',
			startRow: 1,
			startColumn: 2,
			endRow: 3,
			endColumn: 4
		}

		manager.jumpToCode(data)

		// The consoleLogSpy should be called with the new emitter function
		expect(consoleLogSpy).toHaveBeenCalledWith({ data: data, type: 'SHOW_CODE' })
	})
})
