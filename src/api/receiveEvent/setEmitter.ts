import { WebviewReceiveEventType } from '..'

export interface ReceiveSetEmitterEvent {
	type: WebviewReceiveEventType.SetEmitter
	emitterFunc: string
}
