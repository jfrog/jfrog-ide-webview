import { PageType } from './pageType'
import { ISeverity } from './severity'
import { IAnalysisStep } from './analysisStep'

export interface IEosPage {
  pageType: PageType.Eos;
  header: string
  location: IAnalysisStep
  description?: string
  remediation?: string[]
  foundText?: string
  analysisStep?: IAnalysisStep[]
  severity?: ISeverity
}