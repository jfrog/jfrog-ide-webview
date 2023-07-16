import { WebviewReceiveEventType } from '..'
import { WebviewPage } from '../../model/webviewPages'

export interface ReceiveShowPageEvent {
	type: WebviewReceiveEventType.ShowPage
	data: WebviewPage
}
