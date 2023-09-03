// import { render, fireEvent } from '@testing-library/react'
// import { Collapse, Props } from './Collapse'
//
// describe('Collapse component', () => {
// 	const mockData: Props = {
// 		id: 'test-id',
// 		header: 'Test Header',
// 		text: 'Test Content'
// 	}
//
// 	test('renders collapse header and content', () => {
// 		const { getByText } = render(<Collapse {...mockData} />)
//
// 		// Assert that the collapse header is rendered
// 		expect(getByText(mockData.header)).toBeInTheDocument()
//
// 		// Assert that the collapse content is initially hidden
// 		const collapseContent = getByText(mockData.text).parentElement
// 		expect(collapseContent).toHaveStyle('height: 0px')
// 	})
//
// 	test('expands and collapses the content when clicked', () => {
// 		const { getByText } = render(<Collapse {...mockData} />)
//
// 		const collapseHeader = getByText(mockData.header)
//
// 		// Assert that the collapse content is expanded
// 		const collapseContent = getByText(mockData.text).parentElement
// 		expect(collapseContent).toHaveStyle('height: 0px')
//
// 		// Simulate click on the collapse header
// 		fireEvent.click(collapseHeader)
// 		expect(collapseContent).not.toHaveStyle('height: 0px')
//
// 		// Simulate click on the collapse header again
// 		fireEvent.click(collapseHeader)
// 		expect(collapseContent).toHaveStyle('height: 0px')
// 	})
//
// 	test('renders markdown content when "markdown" prop is true', () => {
// 		const markdownProps: Props = {
// 			...mockData,
// 			markdown: true
// 		}
// 		const { getByText } = render(<Collapse {...markdownProps} />)
//
// 		// Assert that the markdown content is rendered
// 		expect(getByText(mockData.text)).toBeInTheDocument()
// 	})
// })
