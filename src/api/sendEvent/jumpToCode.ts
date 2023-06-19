import { WebviewSendEventType } from '..'
import { IAnalysisStep } from '../../model/analysisStep'

export interface SendJumpToCodeEvent {
	type: WebviewSendEventType.JUMP_TO_CODE
	data: IAnalysisStep
}
