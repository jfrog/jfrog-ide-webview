import { PageType } from './pageType'

export interface IZeroDayPage {
  pageType: PageType.ZeroDays;
  header: string
  location: IAnalysisStep
  description?: string
  remediation?: string[]
  foundText?: string
  analysisStep? :IAnalysisStep[]
}
export interface IAnalysisStep {
  file: string
  row: number
  colum: number
}