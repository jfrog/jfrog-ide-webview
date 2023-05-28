import { render, screen } from '@testing-library/react'
import PublicSources, { Props } from './PublicSources'
import { getByTextAcrossMultipleElements } from '../../../../../utils/testUtils'

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

		expect(screen.getByText('SUMMARY')).toBeInTheDocument()
		expect(screen.getByText('This is a summary')).toBeInTheDocument()
		expect(screen.getByText('VULNERABLE VERSIONS')).toBeInTheDocument()
		expect(screen.getAllByText(/1.0|33.0/)).toHaveLength(2)
		expect(screen.getByText('CVSS BREAKDOWN')).toBeInTheDocument()
	})

	test('renders only summary', () => {
		const customMockData = {
			summary: 'This is a summary'
		}
		render(<PublicSources {...customMockData} />)

		expect(screen.getByText('SUMMARY')).toBeInTheDocument()
		expect(screen.getByText('This is a summary')).toBeInTheDocument()
		expect(screen.queryByText('VULNERABLE VERSIONS')).toBeNull()
		expect(screen.queryByText('CVSS BREAKDOWN')).toBeNull()
	})

	test('renders only infected versions', () => {
		const customMockData = {
			infectedVersions: ['1.0', '44.0']
		}
		render(<PublicSources {...customMockData} />)

		expect(screen.queryByText('SUMMARY')).toBeNull()
		expect(screen.getByText('VULNERABLE VERSIONS')).toBeInTheDocument()
		expect(screen.getAllByText(/1.0|44.0/)).toHaveLength(2)
		expect(screen.queryByText('CVSS BREAKDOWN')).toBeNull()
	})

	test('renders no summary, infected versions, or CVSS breakdown', () => {
		render(<PublicSources />)

		expect(screen.queryByText('SUMMARY')).toBeNull()
		expect(screen.queryByText('VULNERABLE VERSIONS')).toBeNull()
		expect(screen.queryByText('CVSS BREAKDOWN')).toBeNull()
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
})
