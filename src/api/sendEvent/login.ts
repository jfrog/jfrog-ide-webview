import { WebviewSendEventType } from '..'
import { ISendLoginEventData } from '../../model/login'

export interface SendLoginEvent {
	type: WebviewSendEventType.LOGIN
	data: ISendLoginEventData
}
