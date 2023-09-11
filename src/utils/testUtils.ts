import { Matcher, SelectorMatcherOptions } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { IdeEventType } from '../api'
import { EventManager } from '../api/eventManager'
import { WebviewPage } from '../model'

export const getByTextAcrossMultipleElements = (
	getByText: (text: Matcher, options?: SelectorMatcherOptions | undefined) => HTMLElement,
	text: string
): HTMLElement => getByText((content, element) => element?.textContent === text)

export const sendWebviewPage = async (data: IData): Promise<MessageEvent> => {
	const messageEvent = new MessageEvent('message', {
		data: data
	})
	act(() => {
		window.dispatchEvent(messageEvent)
	})
	return messageEvent
}

export interface IData {
	type: IdeEventType
	data?: unknown
}

export class TestEventManager extends EventManager {
	constructor(
		setPageState: React.Dispatch<React.SetStateAction<WebviewPage>>,
		customSendFunc: () => void
	) {
		super(setPageState)
		this.sendFunc = customSendFunc
	}
}
