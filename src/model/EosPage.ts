import { PageType } from './pageType'
import { ISeverity } from './severity'

export interface IEosPage {
  pageType: PageType.Eos;
  header: string
  location: IAnalysisStep
  description?: string
  remediation?: string[]
  foundText?: string
  analysisStep? :IAnalysisStep[]
  severity?: ISeverity
}
export interface IAnalysisStep {
  file: string
  row: number
  colum: number
}