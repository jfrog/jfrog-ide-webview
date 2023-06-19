import { IReference } from './reference'

describe('Model - IReference', () => {
	test('should create a valid reference object with a text and URL', () => {
		// Create a reference object
		const reference: IReference = {
			text: 'OpenAI',
			url: 'https://www.openai.com'
		}

		// Assert the properties of the reference object
		expect(reference).toBeDefined()
		expect(reference.text).toBe('OpenAI')
		expect(reference.url).toBe('https://www.openai.com')
	})

	test('should create a valid reference object with only a URL', () => {
		// Create a reference object without a text
		const reference: IReference = {
			url: 'https://www.example.com'
		}

		// Assert the properties of the reference object
		expect(reference).toBeDefined()
		expect(reference.text).toBeUndefined()
		expect(reference.url).toBe('https://www.example.com')
	})
})
