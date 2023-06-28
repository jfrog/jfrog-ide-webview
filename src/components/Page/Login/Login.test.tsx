import { render, screen } from '@testing-library/react'
import { Login } from './Login'
import { ILoginPage, PageType } from '../../../model/webviewPages'
import { LoginConnectionType, LoginProgressStatus } from '../../../model/login'

let overlayElement: HTMLElement | null

describe('Login component', () => {
	beforeEach(() => {
		overlayElement = document.createElement('div')
		overlayElement.setAttribute('id', 'overlay')
		document.body.appendChild(overlayElement)
	})

	afterEach(() => {
		overlayElement?.remove()
		overlayElement = null
		jest.restoreAllMocks()
	})

	const mockData: ILoginPage = {
		pageType: PageType.Login,
		url: 'https://example.com',
		status: LoginProgressStatus.Initial,
		connectionType: LoginConnectionType.BasicAuthOrToken
	}

	test('renders Login component', () => {
		render(<Login data={mockData} />)
		screen.getByTestId('jfrog-icon')
	})

	test('does not display LoginModal when status is initial', () => {
		render(<Login data={mockData} />)

		const loginModalElement = screen.queryByTestId('Verifying...')
		expect(loginModalElement).not.toBeInTheDocument()
	})

	test('displays LoginModal when status is not initial', () => {
		const updatedMockData: ILoginPage = {
			...mockData,
			status: LoginProgressStatus.Verifying
		}
		render(<Login data={updatedMockData} />)
		const loginModalElement = screen.getByText('Verifying...')
		expect(loginModalElement).toBeInTheDocument()
	})
})
