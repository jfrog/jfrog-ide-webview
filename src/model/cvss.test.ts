import {
	Cvss3,
	GeneralCvss3Value,
	UserInteractionValue,
	CvssScop,
	AccessVectorValue,
	AttackVectorValue,
	AccessComplexityValue,
	AccessVectorTranslator,
	AccessComplexityValueTranslator,
	AuthenticationValueTranslator,
	ImpactValueTranslator,
	AuthenticationValue,
	ImpactValue
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

	describe('AccessVectorTranslator', () => {
		test('translates string to AccessVectorValue correctly', () => {
			expect(AccessVectorTranslator('L')).toBe(AccessVectorValue.Local)
			expect(AccessVectorTranslator('A')).toBe(AccessVectorValue.AdjacentNetwork)
			expect(AccessVectorTranslator('N')).toBe(AccessVectorValue.Network)
		})

		test('returns undefined for unknown string', () => {
			expect(AccessVectorTranslator('X')).toBeUndefined()
		})
	})

	describe('AccessComplexityValueTranslator', () => {
		test('translates string to AccessComplexityValue correctly', () => {
			expect(AccessComplexityValueTranslator('L')).toBe(AccessComplexityValue.Low)
			expect(AccessComplexityValueTranslator('M')).toBe(AccessComplexityValue.Medium)
			expect(AccessComplexityValueTranslator('H')).toBe(AccessComplexityValue.High)
		})

		test('returns undefined for unknown string', () => {
			expect(AccessComplexityValueTranslator('X')).toBeUndefined()
		})
	})

	describe('AuthenticationValueTranslator', () => {
		test('translates string to AuthenticationValue correctly', () => {
			expect(AuthenticationValueTranslator('M')).toBe(AuthenticationValue.Multiple)
			expect(AuthenticationValueTranslator('S')).toBe(AuthenticationValue.Single)
			expect(AuthenticationValueTranslator('N')).toBe(AuthenticationValue.None)
		})

		test('returns undefined for unknown string', () => {
			expect(AuthenticationValueTranslator('X')).toBeUndefined()
		})
	})

	describe('ImpactValueTranslator', () => {
		test('translates string to ImpactValue correctly', () => {
			expect(ImpactValueTranslator('N')).toBe(ImpactValue.None)
			expect(ImpactValueTranslator('P')).toBe(ImpactValue.Partial)
			expect(ImpactValueTranslator('C')).toBe(ImpactValue.Complete)
		})

		test('returns undefined for unknown string', () => {
			expect(ImpactValueTranslator('X')).toBeUndefined()
		})
	})
})
