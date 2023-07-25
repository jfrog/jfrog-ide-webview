import { IdeEventSetEmitter } from './ideEvent'
import { IdeEventShowPage } from './ideEvent/showPage'
import { WebviewEventJumpToCode } from './webviewEvent/jumpToCode'
import { WebviewEventLogin } from './webviewEvent/login'

// Represents a Webview-specific event that can be sent from the Webview to the IDE.
export enum WebviewEventType {
	JumpToCode = 'SHOW_CODE',
	Login = 'LOGIN'
}

export type WebviewEvent = WebviewEventJumpToCode | WebviewEventLogin

// Represents an IDE-specific event that can be sent from the IDE to the Webview.
export enum IdeEventType {
	SetEmitter = 'SET_EMITTER',
	ShowPage = 'SHOW_PAGE'
}

export type IdeEvent = IdeEventShowPage | IdeEventSetEmitter
