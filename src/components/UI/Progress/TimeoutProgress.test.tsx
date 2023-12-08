import { timeRemainTillExpired } from './TimeoutProgress'

describe('timeRemainTillExpired function', () => {
	test('returns 0% progress when timeout is over', () => {
		// Fake the end time to be equal to the start time
		const endTime = Date.now()
		const timeoutMs = 3000

		const imeRemainTillExpiredLevel = timeRemainTillExpired(endTime, timeoutMs)

		expect(imeRemainTillExpiredLevel).toBe(0)
	})

	test('returns 100% progress when current time just started', () => {
		// Fake the end time to be 3 seconds after the start time
		const endTime = Date.now()
		const timeoutMs = 3000
		const currentTime = endTime + timeoutMs

		const imeRemainTillExpiredLevel = timeRemainTillExpired(currentTime, timeoutMs)

		expect(imeRemainTillExpiredLevel).toBe(100)
	})

	test('returns 50% progress when current time is halfway between start and timeout', () => {
		// Fake the end time to be 1.5 seconds
		const endTime = Date.now() + 1500
		const timeoutMs = 3000

		const imeRemainTillExpiredLevel = timeRemainTillExpired(endTime, timeoutMs)

		expect(imeRemainTillExpiredLevel).toBe(50)
	})

	test('returns 0% progress when time remain till expired is over long ago', () => {
		const timeoutMs = 3000
		const endTime = Date.now() - timeoutMs * 2

		const imeRemainTillExpiredLevel = timeRemainTillExpired(endTime, timeoutMs)

		expect(imeRemainTillExpiredLevel).toBe(0)
	})
})
