import { WebviewPage } from '../model/webviewPages'

export interface ShowPageEvent {
	type: webviewEventType.ShowPage
	pageData: WebviewPage
}

export interface SetEmitterEvent {
	type: webviewEventType.SetEmitter
	emitterFunc: string
}

export enum webviewEventType {
	SetEmitter = 'SET_EMITTER',
	ShowPage = 'SHOW_DATA'
}

export type WebviewEvent = ShowPageEvent | SetEmitterEvent
