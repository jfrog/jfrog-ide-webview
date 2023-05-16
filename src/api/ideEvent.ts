import { IAnalysisStep } from '../model/analysisStep'

export interface JumpToCodeEvent {
	type: IdeEventType.JUMP_TO_CODE
	data: IAnalysisStep
}

export enum IdeEventType {
	JUMP_TO_CODE = 'SHOW_CODE'
}

export type IdeEvent = JumpToCodeEvent
