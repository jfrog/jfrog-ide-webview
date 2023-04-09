export enum GeneralCvss3Value {
	None = 'None',
	Low = 'Low',
	High = 'High'
}

export enum UserInteractionValue {
	None = 'None',
	Required = 'Required'
}

export enum CvssScop {
	Unchanged = 'Unchanged',
	Changed = 'Changed'
}

export enum AccessVectorValue {
	Local = 'Local',
	AdjacentNetwork = 'Adjacent Network',
	Network = 'Network'
}

enum AuthenticationValue {
	Multiple = 'Multiple',
	Single = 'Single',
	None = 'None'
}

export interface Cvss3Data {
	key: string
	value?: AttackVectorValue | GeneralCvss3Value | UserInteractionValue | CvssScop
}

export enum AccessComplexityValue {
	Low = 'Low',
	Medium = 'Medium',
	High = 'High'
}

enum ImpactValue {
	None = 'None',
	Partial = 'Partial',
	Complete = 'Complete'
}

export enum AttackVectorValue {
	Network = 'Network',
	Adjacent = 'Adjacent',
	Local = 'Local',
	Physical = 'Physical'
}

export class Cvss3 {
	version = ''

	attackVector: Cvss3Data = { key: 'Attack Vector (AV)' }

	attackComplexity: Cvss3Data = { key: 'Attack Complexity (AC)' }

	privilegesRequired: Cvss3Data = { key: 'Privileges Required (PR)' }

	userInteraction: Cvss3Data = { key: 'User Interaction (UI)' }

	scope: Cvss3Data = { key: 'Scope (S)' }

	confidentiality: Cvss3Data = { key: 'Confidentiality (C)' }

	integrity: Cvss3Data = { key: 'Integrity (I)' }

	availability: Cvss3Data

	constructor() {
		this.availability = { key: 'Attack Vector (AV)' }
		return this
	}

	getBaseMatrix(): Cvss3Data[] {
		return [
			this.attackVector,
			this.attackComplexity,
			this.privilegesRequired,
			this.userInteraction,
			this.scope
		]
	}

	getImpact(): Cvss3Data[] {
		return [this.confidentiality, this.integrity, this.availability]
	}
}

export const GeneralCvss3Translator = (str: string): GeneralCvss3Value | undefined => {
	switch (str) {
		case 'N':
			return GeneralCvss3Value.None
		case 'L':
			return GeneralCvss3Value.Low
		case 'H':
			return GeneralCvss3Value.High
	}

	return undefined
}

export const UserInteractionTranslator = (str: string): UserInteractionValue | undefined => {
	switch (str) {
		case 'N':
			return UserInteractionValue.None
		case 'R':
			return UserInteractionValue.Required
	}

	return undefined
}

export const AttackVectorTranslator = (str: string): AttackVectorValue | undefined => {
	switch (str) {
		case 'N':
			return AttackVectorValue.Network
		case 'A':
			return AttackVectorValue.Adjacent
		case 'L':
			return AttackVectorValue.Local
		case 'P':
			return AttackVectorValue.Physical
	}

	return undefined
}

export const CvssScopTranslator = (str: string): CvssScop | undefined => {
	switch (str) {
		case 'U':
			return CvssScop.Unchanged
		case 'C':
			return CvssScop.Changed
	}

	return undefined
}

export interface Cvss2Data {
	key: string
	value?: AccessVectorValue | AccessComplexityValue | AuthenticationValue | ImpactValue
}

export class Cvss2 {
	version = ''

	accessVector: Cvss2Data = { key: 'Access Vector (AV)' }

	accessComplexity: Cvss2Data = { key: 'Access Complexity (AC)' }

	authentication: Cvss2Data = { key: 'Authentication (Au)' }

	confidentialityImpact: Cvss2Data = { key: 'Confidentiality Impact (C)' }

	integrity: Cvss2Data = { key: 'Integrity (I)' }

	availabilityImpact: Cvss2Data = { key: 'Availability (A)' }

	getBaseMatrix(): Cvss2Data[] {
		return [this.accessVector, this.accessComplexity, this.authentication]
	}

	getImpact(): Cvss2Data[] {
		return [this.confidentialityImpact, this.integrity, this.availabilityImpact]
	}
}

export const AccessVectorTranslator = (str: string): AccessVectorValue | undefined => {
	switch (str) {
		case 'L':
			return AccessVectorValue.Local
		case 'A':
			return AccessVectorValue.AdjacentNetwork
		case 'N':
			return AccessVectorValue.Network
	}

	return undefined
}

export const AccessComplexityValueTranslator = (str: string): AccessComplexityValue | undefined => {
	switch (str) {
		case 'L':
			return AccessComplexityValue.Low
		case 'M':
			return AccessComplexityValue.Medium
		case 'H':
			return AccessComplexityValue.High
	}

	return undefined
}

export const AuthenticationValueTranslator = (str: string): AuthenticationValue | undefined => {
	switch (str) {
		case 'M':
			return AuthenticationValue.Multiple
		case 'S':
			return AuthenticationValue.Single
		case 'N':
			return AuthenticationValue.None
	}

	return undefined
}

export const ImpactValueTranslator = (str: string): ImpactValue | undefined => {
	switch (str) {
		case 'N':
			return ImpactValue.None
		case 'P':
			return ImpactValue.Partial
		case 'C':
			return ImpactValue.Complete
	}

	return undefined
}
