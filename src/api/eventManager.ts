import { IdeEvent, IdeEventType, WebviewEvent, WebviewEventType } from '.'
import { IAnalysisStep } from '../model/analysisStep'
import { ISendLoginEventData } from '../model/login'
import { WebviewPage } from '../model/webviewPages'
import { WebviewEventJumpToCode } from './webviewEvent/jumpToCode'
import { WebviewEventLogin } from './webviewEvent/login'

export class EventManager {
	protected sendFunc = new Function('request', 'console.log(request)')

	constructor(private setPageState: React.Dispatch<React.SetStateAction<WebviewPage>>) {
		this.setEventReceiver()
	}

	private sendEvent = (req: WebviewEvent): void => {
		this.sendFunc(req)
	}

	private setEventReceiver(): void {
		window.addEventListener('message', event => {
			const eventData: IdeEvent = event.data

			switch (eventData.type) {
				case IdeEventType.SetEmitter:
					this.sendFunc = new Function(eventData.data)()
					break
				case IdeEventType.ShowPage:
					this.setPageState(eventData.data)
					break
			}
		})
	}

	public jumpToCode(data: IAnalysisStep): void {
		this.sendEvent({ type: WebviewEventType.JumpToCode, data: data } as WebviewEventJumpToCode)
	}

	public login(data: ISendLoginEventData): void {
		this.sendEvent({ type: WebviewEventType.Login, data: data } as WebviewEventLogin)
	}
}
