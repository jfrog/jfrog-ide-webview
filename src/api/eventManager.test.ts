import { IdeEventType } from '.'
import { IData, sendWebviewPage } from '../utils/testUtils'
import { EventManager } from './eventManager'

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

	test('sets the event receiver and handles ShowPage event', async () => {
		const mockPage = {
			type: IdeEventType.ShowPage,
			data: { title: 'Test Page' }
		}
		await sendWebviewPage(mockPage)

		expect(setPageStateMock).toHaveBeenCalledTimes(1)
		expect(setPageStateMock).toHaveBeenCalledWith({ title: 'Test Page' })
	})

	test('sets the event receiver and handles the SetEmitter event with the correct data', async () => {
		const consoleLogSpy = jest.spyOn(global.console, 'warn')
		const emitterFunc = 'return console.warn'
		const setEmitterEvent = {
			type: IdeEventType.SetEmitter,
			data: emitterFunc
		} as IData

		await sendWebviewPage(setEmitterEvent)

		const data = {
			file: 'file-example',
			startRow: 1,
			startColumn: 2,
			endRow: 3,
			endColumn: 4
		}

		manager.jumpToCode(data)

		// The consoleLogSpy should be called with the new emitter function
		expect(consoleLogSpy).toHaveBeenCalledWith({ data: data, type: 'JUMP_TO_CODE' })
	})
})
