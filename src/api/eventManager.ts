import {
	WebviewReceiveEvent,
	WebviewReceiveEventType,
	WebviewSendEvent,
	WebviewSendEventType
} from '.'
import { IAnalysisStep } from '../model/analysisStep'
import { ISendLoginEventData } from '../model/login'
import { WebviewPage } from '../model/webviewPages'
import { SendJumpToCodeEvent } from './sendEvent/jumpToCode'
import { SendLoginEvent } from './sendEvent/login'

export class EventManager {
	protected sendFunc = new Function('request', 'console.log(request)')

	constructor(private setPageState: React.Dispatch<React.SetStateAction<WebviewPage>>) {
		this.setEventReceiver()
	}

	private sendEvent = (req: WebviewSendEvent): void => {
		this.sendFunc(req)
	}

	private setEventReceiver(): void {
		window.addEventListener('message', event => {
			const eventData: WebviewReceiveEvent = event.data

			switch (eventData.type) {
				case WebviewReceiveEventType.SetEmitter:
					this.sendFunc = new Function(eventData.emitterFunc)()
					break
				case WebviewReceiveEventType.ShowPage:
					this.setPageState(eventData.pageData)
					break
			}
		})
	}

	public jumpToCode(data: IAnalysisStep): void {
		this.sendEvent({ type: WebviewSendEventType.JumpToCode, data: data } as SendJumpToCodeEvent)
	}

	public login(data: ISendLoginEventData): void {
		this.sendEvent({ type: WebviewSendEventType.Login, data: data } as SendLoginEvent)
	}
}
