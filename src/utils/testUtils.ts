import { Matcher, SelectorMatcherOptions } from '@testing-library/react'
import { webviewEventType } from '../api/webviewEvent'
import { act } from 'react-dom/test-utils'

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
	type: webviewEventType
	pageData?: unknown
	emitterFunc?: string
}
