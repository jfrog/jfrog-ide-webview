import { render, screen } from '@testing-library/react'
import App from './App'
import { webviewEventType } from './api/webviewEvent'
import { IDependencyPage, IEosPage, IIaCPage, ISecretsPage, PageType } from './model/webviewPages'
import { ISeverity } from './model/severity'
import { IImpactGraph } from './model/impactGraph'
import { sendWebviewPage } from './utils/testUtils'
import { IAnalysisStep } from './model/analysisStep'

describe('App component', () => {
	test('renders the Dependency page when the page type is "Dependency"', async () => {
		render(<App />)

		// Load Dependency.
		const pageData = {
			type: webviewEventType.ShowPage,
			pageData: {
				id: 'Dependency-ID',
				pageType: PageType.Dependency,
				componentType: 'q',
				component: 'component',
				version: 'version',
				impactGraph: { name: 'name', children: [] } as IImpactGraph,
				severity: ISeverity.High,
				edited: '0'
			} as IDependencyPage
		}
		await sendWebviewPage(pageData)

		// Assert that the Dependency component is rendered
		expect(screen.getAllByText('Dependency-ID')).toHaveLength(2)
	})

	test('renders the Eos page when the page type is "Eos"', async () => {
		render(<App />)

		// Load Eos page.
		const pageData = {
			type: webviewEventType.ShowPage,
			pageData: {
				pageType: PageType.Eos,
				header: 'Header-eos',
				location: { file: 'file' } as IAnalysisStep
			} as IEosPage
		}
		await sendWebviewPage(pageData)

		// Assert that the Eos component is rendered
		expect(screen.getByText('Header-eos')).toBeInTheDocument()
	})

	test('renders the IaC page when the page type is "IaC"', async () => {
		render(<App />)

		// Load IaC page.
		const pageData = {
			type: webviewEventType.ShowPage,
			pageData: {
				pageType: PageType.IaC,
				header: 'Header-iac',
				severity: ISeverity.High,
				location: { file: 'file' },
				description: 'description'
			} as IIaCPage
		}
		await sendWebviewPage(pageData)

		// Assert that the Iac component is rendered.
		expect(screen.getByText('Header-iac')).toBeInTheDocument()
	})

	test('renders the Secrets page when the page type is "Secrets"', async () => {
		render(<App />)

		// Load Secrets page.
		const pageData = {
			type: webviewEventType.ShowPage,
			pageData: {
				pageType: PageType.Secrets,
				header: 'Header-secret',
				location: { file: 'file' },
				severity: ISeverity.High,
				description: 'description'
			} as ISecretsPage
		}
		await sendWebviewPage(pageData)

		// Assert that the Dependency component is rendered.
		expect(screen.getByText('Header-secret')).toBeInTheDocument()
	})

	test('renders "Nothing to show" when the page type is not recognized', () => {
		render(<App />)

		// Assert that "Nothing to show" text is rendered.
		expect(screen.getByText('Nothing to show')).toBeInTheDocument()
	})
})
