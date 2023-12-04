import { IdeEvent, IdeEventType, WebviewEvent, WebviewEventType } from '.'
import { IAnalysisStep } from '../model/analysisStep'
import { ISendLoginEventData } from '../model/login'
import { WebviewPage } from '../model/webviewPages'

export class EventManager {
	protected sendFunc = new Function('request', 'console.log(request)')

	private loaded = false

	constructor(private setPageState: React.Dispatch<React.SetStateAction<WebviewPage>>) {
		this.setEventReceiver()
	}

	private sendEvent = (req: WebviewEvent): void => {
		this.sendFunc(req)
	}

	private setEventReceiver(): void {
		window.addEventListener('message', async event => {
			const eventData: IdeEvent = event.data

			switch (eventData.type) {
				case IdeEventType.SetEmitter:
					this.setEmitter(eventData.data)
					break
				case IdeEventType.ShowPage:
					this.setPageState(eventData.data)
					break
			}
		})
	}

	public jumpToCode(data: IAnalysisStep): void {
		this.sendEvent({ type: WebviewEventType.JumpToCode, data: data })
	}

	public login(data: ISendLoginEventData): void {
		this.sendEvent({ type: WebviewEventType.Login, data: data })
	}

	public setEmitter(data: string): void {
		if (this.loaded) {
			return
		}

		this.sendFunc = new Function(data)()
		this.loaded = true
		this.sendEvent({ type: WebviewEventType.WebviewLoaded })
	}
}
