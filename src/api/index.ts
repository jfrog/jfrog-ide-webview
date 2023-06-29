import { SendLoginEvent } from './sendEvent/login'
import { SendJumpToCodeEvent } from './sendEvent/jumpToCode'
import { ReceiveSetEmitterEvent } from './receiveEvent/setEmitter'
import { ReceiveShowPageEvent } from './receiveEvent/showPage'

// Send event to the IDEs.
export enum WebviewSendEventType {
	JumpToCode = 'SHOW_CODE',
	Login = 'LOGIN'
}

export type WebviewSendEvent = SendJumpToCodeEvent | SendLoginEvent

// Receive events from the IDEs.
export enum WebviewReceiveEventType {
	SetEmitter = 'SET_EMITTER',
	ShowPage = 'SHOW_PAGE'
}

export type WebviewReceiveEvent = ReceiveShowPageEvent | ReceiveSetEmitterEvent
