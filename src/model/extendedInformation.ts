import { ISeverity } from './severity'
export interface IExtendedInformation {
  shortDescription: string
  fullDescription: string
  remediation?: string
  jfrogResearchSeverity: ISeverity
  jfrogResearchSeverityReason?: ISeverityReasons[]
}
export interface ISeverityReasons {
  name: string
  description: string
  /**
   * isPositive means that the severity is decreased due to this reason.
   */
  isPositive: string
}