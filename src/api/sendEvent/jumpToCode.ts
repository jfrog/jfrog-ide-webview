import { WebviewSendEventType } from '..'
import { IAnalysisStep } from '../../model/analysisStep'

export interface SendJumpToCodeEvent {
	type: WebviewSendEventType.JumpToCode
	data: IAnalysisStep
}
