import { render, screen } from '@testing-library/react'
import App from './App'
import {
	IDependencyPage,
	ISastPage,
	IIaCPage,
	ILoginPage,
	ISecretsPage,
	PageType
} from './model/webviewPages'
import { ISeverity } from './model/severity'
import { IImpactGraph } from './model/impactGraph'
import { sendWebviewPage } from './utils/testUtils'
import { IAnalysisStep } from './model/analysisStep'
import { IdeEventType } from './api'
import { LoginConnectionType, LoginProgressStatus } from './model/login'

describe('App component', () => {
	test('renders the Dependency page when the page type is "Dependency"', async () => {
		render(<App />)

		// Load Dependency.
		const mockPage = {
			type: IdeEventType.ShowPage,
			data: {
				id: 'Dependency-ID',
				pageType: PageType.Dependency,
				componentType: 'q',
				component: 'component',
				version: 'version',
				impactGraph: { root: { name: 'name', children: [] } } as IImpactGraph,
				severity: ISeverity.High,
				edited: '0'
			} as IDependencyPage
		}
		await sendWebviewPage(mockPage)

		// Assert that the Dependency component is rendered
		expect(screen.getAllByText('Dependency-ID')).toHaveLength(1)
	})

	test('renders the SAST page when the page type is "Sast"', async () => {
		render(<App />)

		// Load SAST page.
		const data = {
			type: IdeEventType.ShowPage,
			data: {
				pageType: PageType.Sast,
				header: 'Header-sast',
				location: { file: 'file' } as IAnalysisStep
			} as ISastPage
		}
		await sendWebviewPage(data)

		// Assert that the SAST component is rendered
		expect(screen.getByText('Header-sast')).toBeInTheDocument()
	})

	test('renders the IaC page when the page type is "IaC"', async () => {
		render(<App />)

		// Load IaC page.
		const mockPage = {
			type: IdeEventType.ShowPage,
			data: {
				pageType: PageType.IaC,
				header: 'Header-iac',
				severity: ISeverity.High,
				location: { file: 'file' },
				description: 'description'
			} as IIaCPage
		}
		await sendWebviewPage(mockPage)

		// Assert that the Iac component is rendered.
		expect(screen.getByText('Header-iac')).toBeInTheDocument()
	})

	test('renders the Secrets page when the page type is "Secrets"', async () => {
		render(<App />)

		// Load Secrets page.
		const mockPage = {
			type: IdeEventType.ShowPage,
			data: {
				pageType: PageType.Secrets,
				header: 'Header-secret',
				location: { file: 'file' },
				severity: ISeverity.High,
				description: 'description',
				tokenValidation: 'tokenValidation',
				metadata: 'metadata'
			} as ISecretsPage
		}
		await sendWebviewPage(mockPage)

		// Assert that the Dependency component is rendered.
		expect(screen.getByText('Header-secret')).toBeInTheDocument()
	})

	test('renders the Login page when the page type is "Login"', async () => {
		render(<App />)

		const mockPage = {
			type: IdeEventType.ShowPage,
			data: {
				pageType: PageType.Login,
				url: 'www.example.com',
				status: LoginProgressStatus.Initial,
				connectionType: LoginConnectionType.BasicAuthOrToken
			} as ILoginPage
		}
		await sendWebviewPage(mockPage)

		expect(screen.getByText('Welcome to JFrog')).toBeInTheDocument()
	})

	test('renders loading spinner initially', () => {
		const { container } = render(<App />)
		expect(container.querySelector('.loader')).toBeInTheDocument()
	})
})
