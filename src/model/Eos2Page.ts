import { PageType } from './pageType'
import { ISeverity } from './severity';

export interface IEos2Page {
  pageType: PageType.Eos;
  header: string
  severity: ISeverity
  status: string
  id: string
  abbr: string
  fixCost: string
  finding: IFindings
  outcomes: IOutcomes
}
export interface IFindings {
  id: string
}

export interface IOutcomes {
  id: string
}