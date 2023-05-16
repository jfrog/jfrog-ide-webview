import { render, screen } from '@testing-library/react'
import { ActiveTab } from '../../../../model/tab'
import withMarkup, { getFakeDependencyPage } from '../../../../setupTests'
import PageHolder from './PageHolder'
import { IDependencyPage } from '../../../../model/webviewPages'
describe('PageHolder component', () => {
	describe('Research page', () => {
		test('Renders short description', () => {
			// Arrange
			const dependencyPath: IDependencyPage = getFakeDependencyPage()
			render(<PageHolder activeTab={ActiveTab.Research} data={dependencyPath} />)
			// Assert
			const shortDescriptionElement = screen.getByText('shortDescription-text')
			expect(shortDescriptionElement).toBeInTheDocument()
		})

		test('Renders full description', () => {
			// Arrange
			const dependencyPath: IDependencyPage = getFakeDependencyPage()
			render(<PageHolder activeTab={ActiveTab.Research} data={dependencyPath} />)
			// Assert
			const fullDescriptionElement = screen.getByText('fullDescription-text')
			expect(fullDescriptionElement).toBeInTheDocument()
		})

		test('Renders remediation', () => {
			// Arrange
			const dependencyPath: IDependencyPage = getFakeDependencyPage()
			render(<PageHolder activeTab={ActiveTab.Research} data={dependencyPath} />)
			// Assert
			const remediationElement = screen.getByText('remediation-text')
			expect(remediationElement).toBeInTheDocument()
		})

		test('Renders jfrog research severity reason', () => {
			// Arrange
			const dependencyPath: IDependencyPage = getFakeDependencyPage()
			render(<PageHolder activeTab={ActiveTab.Research} data={dependencyPath} />)
			// Assert
			const reasonOneElement = screen.getByText('jfrogResearchSeverityReason-name-1')
			expect(reasonOneElement).toBeInTheDocument()
			const descriptionOneElement = screen.getByText('jfrogResearchSeverityReason-description-1')
			expect(descriptionOneElement).toBeInTheDocument()
			const reasonTwoElement = screen.getByText('jfrogResearchSeverityReason-name-2')
			expect(reasonTwoElement).toBeInTheDocument()
			const descriptionTwoElement = screen.getByText('jfrogResearchSeverityReason-description-2')
			expect(descriptionTwoElement).toBeInTheDocument()
			const reasonThreeElement = screen.getByText('jfrogResearchSeverityReason-name-3')
			expect(reasonThreeElement).toBeInTheDocument()
			const descriptionThreeElement = screen.getByText('jfrogResearchSeverityReason-description-3')
			expect(descriptionThreeElement).toBeInTheDocument()
			const reasonFourElement = screen.getByText('jfrogResearchSeverityReason-name-4')
			expect(reasonFourElement).toBeInTheDocument()
			const descriptionFourElement = screen.getByText('jfrogResearchSeverityReason-description-4')
			expect(descriptionFourElement).toBeInTheDocument()
		})
	})

	describe('Contextual Analysis page', () => {
		test('Renders applicability reason description', () => {
			// Arrange
			const dependencyPath: IDependencyPage = getFakeDependencyPage()
			render(<PageHolder activeTab={ActiveTab.ContextualAnalysis} data={dependencyPath} />)
			// Assert
			const shortDescriptionElement = screen.getByText('applicable reason')
			expect(shortDescriptionElement).toBeInTheDocument()
		})

		test('Renders search target description', () => {
			// Arrange
			const dependencyPath: IDependencyPage = getFakeDependencyPage()
			render(<PageHolder activeTab={ActiveTab.ContextualAnalysis} data={dependencyPath} />)
			// Assert
			const shortDescriptionElement = screen.getByText('search target')
			expect(shortDescriptionElement).toBeInTheDocument()
		})

		test('Renders evidence description', () => {
			// Arrange
			const dependencyPath: IDependencyPage = getFakeDependencyPage()
			render(<PageHolder activeTab={ActiveTab.ContextualAnalysis} data={dependencyPath} />)
			// Assert
			const shortDescriptionElement = screen.getByText('search target')
			expect(shortDescriptionElement).toBeInTheDocument()
		})
	})

	describe('Public Sources page', () => {
		test('Renders cvss V2 Score', () => {
			// Arrange
			const dependencyPath: IDependencyPage = getFakeDependencyPage()
			render(<PageHolder activeTab={ActiveTab.PublicSources} data={dependencyPath} />)
			// Assert
			let scoreElement = screen.getByText('Base Score 4.0', { exact: false })
			expect(scoreElement).toBeInTheDocument()
			scoreElement = screen.getByText('CVSS:2.0', { exact: false })
			expect(scoreElement).toBeInTheDocument()
		})

		test('Renders cvss V2 Vector AV element', () => {
			// Arrange
			const dependencyPath: IDependencyPage = getFakeDependencyPage()
			const { getByText } = render(
				<PageHolder activeTab={ActiveTab.PublicSources} data={dependencyPath} />
			)
			// Assert
			const getByTextWithMarkup = withMarkup(getByText)
			const vectorElementValue = getByTextWithMarkup('Attack Vector (AV): Network')
			expect(vectorElementValue).toBeInTheDocument()
		})

		test('Renders cvss V2 Vector AC element', () => {
			// Arrange
			const dependencyPath: IDependencyPage = getFakeDependencyPage()
			const { getByText } = render(
				<PageHolder activeTab={ActiveTab.PublicSources} data={dependencyPath} />
			)
			// Assert
			const getByTextWithMarkup = withMarkup(getByText)
			const vectorElementValue = getByTextWithMarkup('Access Complexity (AC): Low')
			expect(vectorElementValue).toBeInTheDocument()
		})

		test('Renders cvss V2 Vector Au element', () => {
			// Arrange
			const dependencyPath: IDependencyPage = getFakeDependencyPage()
			const { getByText } = render(
				<PageHolder activeTab={ActiveTab.PublicSources} data={dependencyPath} />
			)
			// Assert
			const getByTextWithMarkup = withMarkup(getByText)
			const vectorElementValue = getByTextWithMarkup('Authentication (Au): Single')
			expect(vectorElementValue).toBeInTheDocument()
		})

		test('Renders cvss V2 Vector C element', () => {
			// Arrange
			const dependencyPath: IDependencyPage = getFakeDependencyPage()
			const { getByText } = render(
				<PageHolder activeTab={ActiveTab.PublicSources} data={dependencyPath} />
			)
			// Assert
			const getByTextWithMarkup = withMarkup(getByText)
			const vectorElementValue = getByTextWithMarkup('Confidentiality Impact (C): None')
			expect(vectorElementValue).toBeInTheDocument()
		})

		test('Renders cvss V2 Vector I element', () => {
			// Arrange
			const dependencyPath: IDependencyPage = getFakeDependencyPage()
			const { getByText } = render(
				<PageHolder activeTab={ActiveTab.PublicSources} data={dependencyPath} />
			)
			// Assert
			const getByTextWithMarkup = withMarkup(getByText)
			const vectorElementValue = getByTextWithMarkup('Integrity (I): None')
			expect(vectorElementValue).toBeInTheDocument()
		})

		test('Renders cvss V2 Vector A element', () => {
			// Arrange
			const dependencyPath: IDependencyPage = getFakeDependencyPage()
			const { getByText } = render(
				<PageHolder activeTab={ActiveTab.PublicSources} data={dependencyPath} />
			)
			// Assert
			const getByTextWithMarkup = withMarkup(getByText)
			const vectorElementValue = getByTextWithMarkup('Availability (A): Partial')
			expect(vectorElementValue).toBeInTheDocument()
		})

		test('Renders cvss V3 Score', () => {
			// Arrange
			const dependencyPath: IDependencyPage = getFakeDependencyPage()
			render(<PageHolder activeTab={ActiveTab.PublicSources} data={dependencyPath} />)
			// Assert
			let scoreElement = screen.getByText('Base Score 6.5', { exact: false })
			expect(scoreElement).toBeInTheDocument()
			scoreElement = screen.getByText('CVSS:3.1', { exact: false })
			expect(scoreElement).toBeInTheDocument()
		})

		test('Renders cvss V3 Attack AV element', () => {
			// Arrange
			const dependencyPath: IDependencyPage = getFakeDependencyPage()
			const { getByText } = render(
				<PageHolder activeTab={ActiveTab.PublicSources} data={dependencyPath} />
			)
			// Assert
			const getByTextWithMarkup = withMarkup(getByText)
			const vectorElementValue = getByTextWithMarkup('Attack Vector (AV): Network')
			expect(vectorElementValue).toBeInTheDocument()
		})

		test('Renders cvss V3 Vector AC element', () => {
			// Arrange
			const dependencyPath: IDependencyPage = getFakeDependencyPage()
			const { getByText } = render(
				<PageHolder activeTab={ActiveTab.PublicSources} data={dependencyPath} />
			)
			// Assert
			const getByTextWithMarkup = withMarkup(getByText)
			const vectorElementValue = getByTextWithMarkup('Attack Complexity (AC): Low')
			expect(vectorElementValue).toBeInTheDocument()
		})

		test('Renders cvss V3 Vector PR element', () => {
			// Arrange
			const dependencyPath: IDependencyPage = getFakeDependencyPage()
			const { getByText } = render(
				<PageHolder activeTab={ActiveTab.PublicSources} data={dependencyPath} />
			)
			// Assert
			const getByTextWithMarkup = withMarkup(getByText)
			const vectorElementValue = getByTextWithMarkup('Privileges Required (PR): Low')
			expect(vectorElementValue).toBeInTheDocument()
		})
		test('Renders cvss V3 Vector UI element', () => {
			// Arrange
			const dependencyPath: IDependencyPage = getFakeDependencyPage()
			const { getByText } = render(
				<PageHolder activeTab={ActiveTab.PublicSources} data={dependencyPath} />
			)
			// Assert
			const getByTextWithMarkup = withMarkup(getByText)
			const vectorElementValue = getByTextWithMarkup('User Interaction (UI): None')
			expect(vectorElementValue).toBeInTheDocument()
		})

		test('Renders cvss V3 Vector S element', () => {
			// Arrange
			const dependencyPath: IDependencyPage = getFakeDependencyPage()
			const { getByText } = render(
				<PageHolder activeTab={ActiveTab.PublicSources} data={dependencyPath} />
			)
			// Assert
			const getByTextWithMarkup = withMarkup(getByText)
			const vectorElementValue = getByTextWithMarkup('Scope (S): Unchanged')
			expect(vectorElementValue).toBeInTheDocument()
		})

		test('Renders cvss V3 Vector C element', () => {
			// Arrange
			const dependencyPath: IDependencyPage = getFakeDependencyPage()
			const { getByText } = render(
				<PageHolder activeTab={ActiveTab.PublicSources} data={dependencyPath} />
			)
			// Assert
			const getByTextWithMarkup = withMarkup(getByText)
			const vectorElementValue = getByTextWithMarkup('Confidentiality (C): None')
			expect(vectorElementValue).toBeInTheDocument()
		})

		test('Renders cvss V3 Vector I element', () => {
			// Arrange
			const dependencyPath: IDependencyPage = getFakeDependencyPage()
			const { getByText } = render(
				<PageHolder activeTab={ActiveTab.PublicSources} data={dependencyPath} />
			)
			// Assert
			const getByTextWithMarkup = withMarkup(getByText)
			const vectorElementValue = getByTextWithMarkup('Integrity (I): Low')
			expect(vectorElementValue).toBeInTheDocument()
		})

		test('Renders cvss V3 Vector AV element', () => {
			// Arrange
			const dependencyPath: IDependencyPage = getFakeDependencyPage()
			const { getByText } = render(
				<PageHolder activeTab={ActiveTab.PublicSources} data={dependencyPath} />
			)
			// Assert
			const getByTextWithMarkup = withMarkup(getByText)
			const vectorElementValue = getByTextWithMarkup('Attack Vector (AV): High')
			expect(vectorElementValue).toBeInTheDocument()
		})
	})
})
