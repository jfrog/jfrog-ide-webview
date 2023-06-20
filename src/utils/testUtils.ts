import { Matcher, SelectorMatcherOptions } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { WebviewReceiveEventType } from '../api'

export const getByTextAcrossMultipleElements = (
	getByText: (text: Matcher, options?: SelectorMatcherOptions | undefined) => HTMLElement,
	text: string
): HTMLElement => getByText((content, element) => element?.textContent === text)

export const sendWebviewPage = async (pageData: IPageData): Promise<MessageEvent> => {
	const messageEvent = new MessageEvent('message', {
		data: pageData
	})
	await act(() => {
		window.dispatchEvent(messageEvent)
	})
	return messageEvent
}

export interface IPageData {
	type: WebviewReceiveEventType
	pageData?: unknown
	emitterFunc?: string
}
