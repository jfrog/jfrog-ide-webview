import { WebviewReceiveEventType } from '..'

export interface ReceiveSetEmitterEvent {
	type: WebviewReceiveEventType.SetEmitter
	data: string
}
