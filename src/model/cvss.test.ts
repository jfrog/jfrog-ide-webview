import {
	Cvss3,
	GeneralCvss3Value,
	UserInteractionValue,
	CvssScop,
	AccessVectorValue,
	AttackVectorValue,
	AccessComplexityValue
} from './cvss'

describe('Cvss3 model', () => {
	let cvss3: Cvss3

	beforeEach(() => {
		cvss3 = new Cvss3()
	})

	test('returns the base matrix correctly', () => {
		const baseMatrix = cvss3.getBaseMatrix()

		expect(baseMatrix).toHaveLength(5)
		expect(baseMatrix).toEqual(
			expect.arrayContaining([
				{ key: 'Attack Vector (AV)' },
				{ key: 'Attack Complexity (AC)' },
				{ key: 'Privileges Required (PR)' },
				{ key: 'User Interaction (UI)' },
				{ key: 'Scope (S)' }
			])
		)
	})

	test('returns the impact correctly', () => {
		const impact = cvss3.getImpact()

		expect(impact).toHaveLength(3)
		expect(impact).toEqual(
			expect.arrayContaining([
				{ key: 'Confidentiality (C)' },
				{ key: 'Integrity (I)' },
				{ key: 'Attack Vector (AV)' }
			])
		)
	})

	test('returns GeneralCvss3Value correctly', () => {
		expect(GeneralCvss3Value.None).toBe('None')
		expect(GeneralCvss3Value.Low).toBe('Low')
		expect(GeneralCvss3Value.High).toBe('High')
	})

	test('returns UserInteractionValue correctly', () => {
		expect(UserInteractionValue.None).toBe('None')
		expect(UserInteractionValue.Required).toBe('Required')
	})

	test('returns CvssScop correctly', () => {
		expect(CvssScop.Unchanged).toBe('Unchanged')
		expect(CvssScop.Changed).toBe('Changed')
	})

	test('returns AccessVectorValue correctly', () => {
		expect(AccessVectorValue.Local).toBe('Local')
		expect(AccessVectorValue.AdjacentNetwork).toBe('Adjacent Network')
		expect(AccessVectorValue.Network).toBe('Network')
	})

	test('returns AttackVectorValue correctly', () => {
		expect(AttackVectorValue.Network).toBe('Network')
		expect(AttackVectorValue.Adjacent).toBe('Adjacent')
		expect(AttackVectorValue.Local).toBe('Local')
		expect(AttackVectorValue.Physical).toBe('Physical')
	})

	test('returns AccessComplexityValue correctly', () => {
		expect(AccessComplexityValue.Low).toBe('Low')
		expect(AccessComplexityValue.Medium).toBe('Medium')
		expect(AccessComplexityValue.High).toBe('High')
	})
})
