import { render, screen } from '@testing-library/react'
import PublicSources, {
	Props,
	createCvssBreakdownV2,
	createCvssBreakdownV2View,
	createCvssBreakdownV3,
	createCvssBreakdownV3View,
	LABELS
} from './PublicSources'
import { getByTextAcrossMultipleElements } from '../../../../../utils/testUtils'
import {
	AccessComplexityValue,
	AccessVectorValue,
	AuthenticationValue,
	CvssScop,
	GeneralCvss3Value,
	ImpactValue,
	UserInteractionValue
} from '../../../../../model/cvss'

describe('Public Sources component', () => {
	const mockData: Props = {
		summary: 'This is a summary',
		infectedVersions: ['1.0', '33.0'],
		cve: {
			id: 'CVE-2023-1234',
			cvssV2Score: '7.5',
			cvssV2Vector: 'CVSS:2.0/AV:N/AC:L/Au:S/C:P/I:P/A:P',
			cvssV3Score: '9.8',
			cvssV3Vector: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H'
		}
	}

	test('renders summary, infected versions, and CVSS breakdown', () => {
		render(<PublicSources {...mockData} />)

		expect(screen.getByText(LABELS.SUMMARY)).toBeInTheDocument()
		expect(screen.getByText('This is a summary')).toBeInTheDocument()
		expect(screen.getByText(LABELS.VULNERABLE_VERSIONS)).toBeInTheDocument()
		expect(screen.getAllByText(/1.0|33.0/)).toHaveLength(2)
		expect(screen.getByText(LABELS.CVSS_BREAKDOWN)).toBeInTheDocument()
	})

	test('renders only summary', () => {
		const customMockData = {
			summary: 'This is a summary'
		}
		render(<PublicSources {...customMockData} />)

		expect(screen.getByText(LABELS.SUMMARY)).toBeInTheDocument()
		expect(screen.getByText('This is a summary')).toBeInTheDocument()
		expect(screen.queryByText(LABELS.VULNERABLE_VERSIONS)).toBeNull()
		expect(screen.queryByText(LABELS.CVSS_BREAKDOWN)).toBeNull()
	})

	test('renders only infected versions', () => {
		const customMockData = {
			infectedVersions: ['1.0', '44.0']
		}
		render(<PublicSources {...customMockData} />)

		expect(screen.queryByText(LABELS.SUMMARY)).toBeNull()
		expect(screen.getByText(LABELS.VULNERABLE_VERSIONS)).toBeInTheDocument()
		expect(screen.getAllByText(/1.0|44.0/)).toHaveLength(2)
		expect(screen.queryByText(LABELS.CVSS_BREAKDOWN)).toBeNull()
	})

	test('renders no summary, infected versions, or CVSS breakdown', () => {
		render(<PublicSources />)

		expect(screen.queryByText(LABELS.SUMMARY)).toBeNull()
		expect(screen.queryByText(LABELS.VULNERABLE_VERSIONS)).toBeNull()
		expect(screen.queryByText(LABELS.CVSS_BREAKDOWN)).toBeNull()
	})

	test('renders the CVSSv2 breakdown', () => {
		render(<PublicSources {...mockData} />)
		const expectedText = [
			'CVSS:2.0 Base Score 7.5',
			'Access Vector (AV): Network',
			'Access Complexity (AC): Low',
			'Authentication (Au): Single',
			'Confidentiality Impact (C): Partial',
			'Integrity (I): Partial',
			'Availability (A): Partial'
		]

		expectedText.forEach((element: string) => {
			expect(getByTextAcrossMultipleElements(screen.getByText, element)).toBeInTheDocument()
		})
	})

	test('renders the CVSSv3 breakdown', () => {
		render(<PublicSources {...mockData} />)
		const expectedText = [
			'CVSS:3.1 Base Score 9.8',
			'Access Complexity (AC): Low',
			'Privileges Required (PR): None',
			'User Interaction (UI): None',
			'Scope (S): Unchanged',
			'Confidentiality (C): High',
			'Integrity (I): High',
			'Attack Vector (AV): High'
		]

		expectedText.forEach((element: string) => {
			expect(getByTextAcrossMultipleElements(screen.getByText, element)).toBeInTheDocument()
		})
	})

	describe('createCvssBreakdownV2', () => {
		test('returns Cvss2 instance correctly', () => {
			const result = createCvssBreakdownV2('CVSS:2.0/AV:N/AC:L/Au:S/C:P/I:P/A:P'.split('/'))

			expect(result).toBeDefined()
			expect(result?.accessVector.value).toBe(AccessVectorValue.Network)
			expect(result?.accessComplexity.value).toBe(AccessComplexityValue.Low)
			expect(result?.authentication.value).toBe(AuthenticationValue.Single)
			expect(result?.confidentialityImpact.value).toBe(ImpactValue.Partial)
			expect(result?.integrity.value).toBe(ImpactValue.Partial)
			expect(result?.availabilityImpact.value).toBe(ImpactValue.Partial)
		})

		test('returns undefined when vector element length is invalid', () => {
			const result = createCvssBreakdownV2('CVSS2.0/AV:N/AC:M/Au:S/C:C/I:C/A'.split('/'))

			expect(result).toBeUndefined()
		})
	})

	describe('createCvssBreakdownV3', () => {
		test('returns Cvss3 instance correctly', () => {
			const result = createCvssBreakdownV3(
				'CVSS:3.1/AV:N/AC:L/PR:H/UI:R/S:C/C:H/I:H/A:H'.split('/')
			)

			expect(result).toBeDefined()
			expect(result?.attackVector.value).toBe(AccessVectorValue.Network)
			expect(result?.attackComplexity.value).toBe(GeneralCvss3Value.Low)
			expect(result?.privilegesRequired.value).toBe(AccessComplexityValue.High)
			expect(result?.userInteraction.value).toBe(UserInteractionValue.Required)
			expect(result?.scope.value).toBe(CvssScop.Changed)
			expect(result?.confidentiality.value).toBe(GeneralCvss3Value.High)
			expect(result?.integrity.value).toBe(GeneralCvss3Value.High)
			expect(result?.availability.value).toBe(GeneralCvss3Value.High)
		})

		test('returns undefined when vector element length is invalid', () => {
			const result = createCvssBreakdownV3('CVSS:3.1/AV:N/AC:L/PR:H/UI:R/S:C/C:H/I:H/A'.split('/'))

			expect(result).toBeUndefined()
		})
	})

	describe('createCvssBreakdownV3View', () => {
		test('returns Cvss3 breakdown view correctly', () => {
			const csvv = 'CVSS:3.1/AV:N'
			const score = '9.8'
			render(createCvssBreakdownV3View(csvv, score))
			expect(screen.getByText('CVSS:3.1 Base Score 9.8')).toBeInTheDocument()
			expect(screen.getByText('Attack Vector (AV):')).toBeInTheDocument()
			expect(screen.getByText('Network')).toBeInTheDocument()
		})

		test('returns default breakdown view correctly', () => {
			const csvv = 'CVSS:3.1/:AV:N/AC:M'
			const score = '10.0'
			render(createCvssBreakdownV2View(csvv, score))

			expect(screen.getByText('Score: 10.0')).toBeInTheDocument()
			expect(screen.getByText('Vector: CVSS:3.1/:AV:N/AC:M')).toBeInTheDocument()
		})
	})

	describe('createCvssBreakdownV2View', () => {
		test('returns Cvss2 breakdown view correctly', () => {
			const csvv = 'CVSS:2.0/AV:N'
			const score = '9.8'
			render(createCvssBreakdownV3View(csvv, score))
			expect(screen.getByText('CVSS:2.0 Base Score 9.8')).toBeInTheDocument()
			expect(screen.getByText('Attack Vector (AV):')).toBeInTheDocument()
			expect(screen.getByText('Network')).toBeInTheDocument()
		})

		test('returns default breakdown view correctly', () => {
			const csvv = 'CVSS:2.0/:AV:N/AC:M'
			const score = '10.0'
			render(createCvssBreakdownV2View(csvv, score))

			expect(screen.getByText('Score: 10.0')).toBeInTheDocument()
			expect(screen.getByText('Vector: CVSS:2.0/:AV:N/AC:M')).toBeInTheDocument()
		})
	})
})
