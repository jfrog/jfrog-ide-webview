import { ILicense } from './license'

describe('Model - ILicense', () => {
	test('should create a valid license object', () => {
		// Create a license object
		const license: ILicense = {
			name: 'MIT',
			link: 'https://opensource.org/licenses/MIT'
		}

		// Assert the properties of the license object
		expect(license).toBeDefined()
		expect(license.name).toBe('MIT')
		expect(license.link).toBe('https://opensource.org/licenses/MIT')
	})

	test('should create a license object without a link', () => {
		// Create a license object without a link
		const license: ILicense = {
			name: 'Apache License 2.0'
		}

		// Assert the properties of the license object
		expect(license).toBeDefined()
		expect(license.name).toBe('Apache License 2.0')
		expect(license.link).toBeUndefined()
	})
})
