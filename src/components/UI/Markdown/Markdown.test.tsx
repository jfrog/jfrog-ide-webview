import { render, screen } from '@testing-library/react'
import Markdown from './Markdown'

describe('Markdown component', () => {
	test('renders the Markdown content', () => {
		const markdownText = '# Heading\n\nSome *italic* and **bold** text.'
		render(<Markdown text={markdownText} />)

		const headingElement = screen.getByRole('heading', { level: 1, name: 'Heading' })
		const italicElement = screen.getByText('italic')
		const boldElement = screen.getByText('bold')

		expect(headingElement).toBeInTheDocument()
		expect(italicElement).toBeInTheDocument()
		expect(boldElement).toBeInTheDocument()
	})

	test('renders inline code without syntax highlighting', () => {
		const markdownText = 'This is some `inline code`.'
		render(<Markdown text={markdownText} />)

		const inlineCodeElement = screen.getByText('inline code')

		expect(inlineCodeElement).toBeInTheDocument()
		expect(inlineCodeElement.tagName).toBe('CODE')
	})

	test('renders code blocks with syntax highlighting', () => {
		const markdownText =
			'```javascript\nconst message = "Hello, world!";\nconsole.log(message);\n```'
		render(<Markdown text={markdownText} />)

		const codeBlockElement = screen.getByText('const')
		const syntaxHighlighterElement = codeBlockElement.parentElement

		expect(codeBlockElement).toBeInTheDocument()
		expect(syntaxHighlighterElement).toBeInTheDocument()
		expect(syntaxHighlighterElement?.parentElement?.parentElement?.tagName).toBe('PRE')
		expect(syntaxHighlighterElement?.className).toMatch('language-javascript')
	})

	test('renders other markdown elements correctly', () => {
		const markdownText = 'This is a [link](https://example.com) and an ![image](image.jpg).'
		render(<Markdown text={markdownText} />)

		const linkElement = screen.getByRole('link', { name: 'link' }) as HTMLAnchorElement
		const imageElement = screen.getByRole('img', { name: 'image' }) as HTMLImageElement

		expect(linkElement).toBeInTheDocument()
		expect(linkElement.getAttribute('href')).toBe('https://example.com')
		expect(imageElement).toBeInTheDocument()
		expect(imageElement.getAttribute('src')).toContain('image.jpg')
	})
})
