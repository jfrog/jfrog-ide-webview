import { Applicability, ICve, IEvidence } from './cve'

describe('Model - ICve', () => {
	test('defines the ICve interface', () => {
		const cve: ICve = {
			id: 'CVE-2021-12345',
			cvssV2Score: '7.8',
			cvssV2Vector: 'AV:N/AC:L/Au:N/C:N/I:N/A:C',
			cvssV3Score: '9.0',
			cvssV3Vector: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H',
			applicableData: {
				applicability: Applicability.APPLICABLE,
				evidence: [
					{
						reason: 'Vulnerability found',
						filePathEvidence: '/path/to/file',
						codeEvidence: 'console.log("Vulnerable code");'
					}
				],
				searchTarget: 'example'
			}
		}

		expect(cve.id).toEqual('CVE-2021-12345')
		expect(cve.cvssV2Score).toEqual('7.8')
		expect(cve.cvssV2Vector).toEqual('AV:N/AC:L/Au:N/C:N/I:N/A:C')
		expect(cve.cvssV3Score).toEqual('9.0')
		expect(cve.cvssV3Vector).toEqual('CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H')

		expect(cve.applicableData).toBeDefined()
		expect(cve.applicableData?.applicability).toBe(Applicability.APPLICABLE)
		expect(cve.applicableData?.evidence).toBeDefined()
		expect(cve.applicableData?.evidence?.length).toBe(1)

		const evidence: IEvidence | undefined = cve.applicableData?.evidence?.[0]
		expect(evidence?.reason).toEqual('Vulnerability found')
		expect(evidence?.filePathEvidence).toEqual('/path/to/file')
		expect(evidence?.codeEvidence).toEqual('console.log("Vulnerable code");')
	})
})
