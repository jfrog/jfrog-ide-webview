export interface IZeroDayPage {
  header: string
  location: string
  description?: string
  remediation?: string[]
  foundText?: string
  analysisStep :IAnalysisStep[]
}
export interface IAnalysisStep {
  file: string
  line: string
}