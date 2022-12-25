export interface IZeroDayPage {
  header: string
  location: string
  resultsDescription: string
  remediation: string[]
  foundText: string
  analysisStep :IAnalysisStep[]
}
export interface IAnalysisStep {
  file: string
  line: string
}