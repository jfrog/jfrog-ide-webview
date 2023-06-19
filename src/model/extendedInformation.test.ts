import { IExtendedInformation, ISeverityReasons } from './extendedInformation'
import { ISeverity } from './severity'

describe('Model - IExtendedInformation', () => {
	test('defines the IExtendedInformation interface', () => {
		const severity: ISeverity = ISeverity.High

		const reasons: ISeverityReasons[] = [
			{
				name: 'Reason 1',
				description: 'Description 1',
				isPositive: false
			},
			{
				name: 'Reason 2',
				description: 'Description 2',
				isPositive: true
			}
		]

		const extendedInformation: IExtendedInformation = {
			shortDescription: 'Short description',
			fullDescription: 'Full description',
			remediation: 'Remediation steps',
			jfrogResearchSeverity: severity,
			jfrogResearchSeverityReason: reasons
		}

		expect(extendedInformation.shortDescription).toEqual('Short description')
		expect(extendedInformation.fullDescription).toEqual('Full description')
		expect(extendedInformation.remediation).toEqual('Remediation steps')

		expect(extendedInformation.jfrogResearchSeverity).toBeDefined()
		expect(extendedInformation.jfrogResearchSeverity).toEqual(severity)

		expect(extendedInformation.jfrogResearchSeverityReason).toBeDefined()
		expect(extendedInformation.jfrogResearchSeverityReason?.length).toBe(2)

		const reason1: ISeverityReasons | undefined =
			extendedInformation.jfrogResearchSeverityReason?.[0]
		expect(reason1?.name).toEqual('Reason 1')
		expect(reason1?.description).toEqual('Description 1')
		expect(reason1?.isPositive).toBe(false)

		const reason2: ISeverityReasons | undefined =
			extendedInformation.jfrogResearchSeverityReason?.[1]
		expect(reason2?.name).toEqual('Reason 2')
		expect(reason2?.description).toEqual('Description 2')
		expect(reason2?.isPositive).toBe(true)
	})
})
