import { Matcher, SelectorMatcherOptions } from '@testing-library/react'
import { webviewEventType } from '../api/webviewEvent'

export const getByTextAcrossMultipleElements = (
	getByText: (text: Matcher, options?: SelectorMatcherOptions | undefined) => HTMLElement,
	text: string
): HTMLElement => getByText((content, element) => element?.textContent === text)

export const sendWebviewPage = (pageData: IPageData): MessageEvent => {
	const messageEvent = new MessageEvent('message', {
		data: pageData
	})
	window.dispatchEvent(messageEvent)
	return messageEvent
}

export interface IPageData {
	type: webviewEventType
	pageData?: unknown
	emitterFunc?: string
}
