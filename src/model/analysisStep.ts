export interface IAnalysisStep {
	file: string
	fileName?: string
	startRow: number
	startColumn: number
	endRow: number
	endColumn: number
	snippet?: string
}
