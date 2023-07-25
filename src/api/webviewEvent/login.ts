import { WebviewEventType } from '..'
import { ISendLoginEventData } from '../../model/login'

export interface WebviewEventLogin {
	type: WebviewEventType.Login
	data: ISendLoginEventData
}
