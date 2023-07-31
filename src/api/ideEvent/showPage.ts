import { IdeEventType } from '..'
import { WebviewPage } from '../../model/webviewPages'

export interface IdeEventShowPage {
	type: IdeEventType.ShowPage
	data: WebviewPage
}
