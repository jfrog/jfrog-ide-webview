import { PageType } from './pageType'

export interface IZeroDayPage {
  pageType: PageType.ZeroDays;
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