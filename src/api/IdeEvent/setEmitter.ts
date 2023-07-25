import { IdeEventType } from '..'

export interface IdeEventSetEmitter {
	type: IdeEventType.SetEmitter
	data: string
}
