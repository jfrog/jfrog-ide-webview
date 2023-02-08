import { PageType } from './pageType'
import { ISeverity } from './severity'
import { IAnalysisStep } from './analysisStep'

export interface IIaCPage {
  pageType: PageType.IaC;
  header: string
  severity: ISeverity
  abbreviation?: string
  location: IAnalysisStep
  description: string
  finding?: IFindings
}
export interface IFindings {
  snippet?: string
  meaning?: string;
  happen?: string;
  do?: string;
}
