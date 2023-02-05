export interface IAnalysisStep {
    file: string
    row: number
    column: number
    snippet ?: string
}