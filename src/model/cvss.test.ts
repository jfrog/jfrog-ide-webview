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
	ImpactValue,
	GeneralCvss3Translator,
	UserInteractionTranslator,
	AttackVectorTranslator,
	CvssScopTranslator
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

	describe('CVSS Translator Functions', () => {
		test('translates string to AccessVectorValue correctly', () => {
			expect(AccessVectorTranslator('L')).toBe(AccessVectorValue.Local)
			expect(AccessVectorTranslator('A')).toBe(AccessVectorValue.AdjacentNetwork)
			expect(AccessVectorTranslator('N')).toBe(AccessVectorValue.Network)
		})

		test('returns undefined for unknown string', () => {
			expect(AccessVectorTranslator('X')).toBeUndefined()
		})

		test('translates string to AccessComplexityValue correctly', () => {
			expect(AccessComplexityValueTranslator('L')).toBe(AccessComplexityValue.Low)
			expect(AccessComplexityValueTranslator('M')).toBe(AccessComplexityValue.Medium)
			expect(AccessComplexityValueTranslator('H')).toBe(AccessComplexityValue.High)
		})

		test('returns undefined for unknown string', () => {
			expect(AccessComplexityValueTranslator('X')).toBeUndefined()
		})

		test('translates string to AuthenticationValue correctly', () => {
			expect(AuthenticationValueTranslator('M')).toBe(AuthenticationValue.Multiple)
			expect(AuthenticationValueTranslator('S')).toBe(AuthenticationValue.Single)
			expect(AuthenticationValueTranslator('N')).toBe(AuthenticationValue.None)
		})

		test('returns undefined for unknown string', () => {
			expect(AuthenticationValueTranslator('X')).toBeUndefined()
		})
	})

	test('translates string to ImpactValue correctly', () => {
		expect(ImpactValueTranslator('N')).toBe(ImpactValue.None)
		expect(ImpactValueTranslator('P')).toBe(ImpactValue.Partial)
		expect(ImpactValueTranslator('C')).toBe(ImpactValue.Complete)
	})

	test('returns undefined for unknown string', () => {
		expect(ImpactValueTranslator('X')).toBeUndefined()
	})

	test('GeneralCvss3Translator translates values correctly', () => {
		expect(GeneralCvss3Translator('N')).toBe(GeneralCvss3Value.None)
		expect(GeneralCvss3Translator('L')).toBe(GeneralCvss3Value.Low)
		expect(GeneralCvss3Translator('H')).toBe(GeneralCvss3Value.High)
		expect(GeneralCvss3Translator('')).toBeUndefined()
		expect(GeneralCvss3Translator('Invalid')).toBeUndefined()
	})

	test('UserInteractionTranslator translates values correctly', () => {
		expect(UserInteractionTranslator('N')).toBe(UserInteractionValue.None)
		expect(UserInteractionTranslator('R')).toBe(UserInteractionValue.Required)
		expect(UserInteractionTranslator('')).toBeUndefined()
		expect(UserInteractionTranslator('Invalid')).toBeUndefined()
	})

	test('AttackVectorTranslator translates values correctly', () => {
		expect(AttackVectorTranslator('N')).toBe(AttackVectorValue.Network)
		expect(AttackVectorTranslator('A')).toBe(AttackVectorValue.Adjacent)
		expect(AttackVectorTranslator('L')).toBe(AttackVectorValue.Local)
		expect(AttackVectorTranslator('P')).toBe(AttackVectorValue.Physical)
		expect(AttackVectorTranslator('')).toBeUndefined()
		expect(AttackVectorTranslator('Invalid')).toBeUndefined()
	})

	test('CvssScopTranslator translates values correctly', () => {
		expect(CvssScopTranslator('U')).toBe(CvssScop.Unchanged)
		expect(CvssScopTranslator('C')).toBe(CvssScop.Changed)
		expect(CvssScopTranslator('')).toBeUndefined()
		expect(CvssScopTranslator('Invalid')).toBeUndefined()
	})
})
