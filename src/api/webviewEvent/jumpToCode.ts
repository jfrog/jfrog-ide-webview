import { WebviewEventType } from '..'
import { IAnalysisStep } from '../../model/analysisStep'

export interface WebviewEventJumpToCode {
	type: WebviewEventType.JumpToCode
	data: IAnalysisStep
}
