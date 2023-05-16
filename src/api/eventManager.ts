import { IAnalysisStep } from '../model/analysisStep'
import { WebviewPage } from '../model/webviewPages'
import { IdeEvent, IdeEventType, JumpToCodeEvent } from './ideEvent'
import { WebviewEvent, webviewEventType } from './webviewEvent'

export class EventManager {
	private sendFunc = new Function('request', 'console.log(request)')

	constructor(private setPageState: React.Dispatch<React.SetStateAction<WebviewPage>>) {
		this.setEventReceiver()
	}

	private sendEvent = (req: IdeEvent): void => {
		this.sendFunc(req)
	}

	private setEventReceiver(): void {
		window.addEventListener('message', event => {
			const eventData: WebviewEvent = event.data

			switch (eventData.type) {
				case webviewEventType.SetEmitter:
					this.sendFunc = new Function(eventData.emitterFunc)()
					break
				case webviewEventType.ShowPage:
					this.setPageState(eventData.pageData)
					break
			}
		})
	}

	public jumpToCode(data: IAnalysisStep): void {
		this.sendEvent({ type: IdeEventType.JUMP_TO_CODE, data: data } as JumpToCodeEvent)
	}
}
