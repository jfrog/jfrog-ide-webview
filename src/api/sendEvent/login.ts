import { WebviewSendEventType } from '..'
import { ISendLoginEventData } from '../../model/login'

export interface SendLoginEvent {
	type: WebviewSendEventType.Login
	data: ISendLoginEventData
}
