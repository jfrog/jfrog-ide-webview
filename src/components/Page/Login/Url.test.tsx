import { render, fireEvent } from '@testing-library/react'
import { Props, Url } from './Url'

describe('Url login component', () => {
	const mockHandleUrl = jest.fn()
	const mockHandleArtifactoryUrl = jest.fn()
	const mockHandleXrayUrl = jest.fn()
	const mockHandleAdvancedUrl = jest.fn()
	const props: Props = {
		inputError: false,
		showAdvancedUrl: false,
		handleUrl: mockHandleUrl,
		handleArtifactoryUrl: mockHandleArtifactoryUrl,
		handleXrayUrl: mockHandleXrayUrl,
		handleAdvancedUrl: mockHandleAdvancedUrl
	}

	test('renders the platform URL input', () => {
		const { getByLabelText } = render(<Url {...props} />)
		expect(getByLabelText('Platform URL')).toBeInTheDocument()
	})

	test('calls the handleUrl function on platform URL input change', () => {
		const { getByLabelText } = render(<Url {...props} />)
		const inputElement = getByLabelText('Platform URL') as HTMLInputElement
		fireEvent.change(inputElement, { target: { value: 'https://example.com' } })
		expect(mockHandleUrl).toHaveBeenCalledTimes(1)
		expect(mockHandleUrl).toHaveBeenCalledWith(expect.any(Object))
	})

	test('renders the "Advanced" button', () => {
		const { getByRole } = render(<Url {...props} />)
		expect(getByRole('button', { name: 'Advanced' })).toBeInTheDocument()
	})

	test('calls the handleAdvancedUrl function on "Advanced" button click', () => {
		const { getByRole } = render(<Url {...props} />)
		fireEvent.click(getByRole('button', { name: 'Advanced' }))
		expect(mockHandleAdvancedUrl).toHaveBeenCalledTimes(1)
	})

	test('renders the Artifactory URL input when showAdvancedUrl is true', () => {
		const customProps: Props = { ...props, showAdvancedUrl: true }
		const { getByLabelText } = render(<Url {...customProps} />)
		const artifactoryInputElement = getByLabelText('Artifactory URL') as HTMLInputElement
		expect(artifactoryInputElement).toBeInTheDocument()
		expect(artifactoryInputElement.type).toBe('text')
	})

	test('calls the handleArtifactoryUrl function on Artifactory URL input change', () => {
		const customProps: Props = { ...props, showAdvancedUrl: true }
		const { getByLabelText } = render(<Url {...customProps} />)
		const artifactoryInputElement = getByLabelText('Artifactory URL') as HTMLInputElement
		fireEvent.change(artifactoryInputElement, {
			target: { value: 'https://artifactory.example.com' }
		})
		expect(mockHandleArtifactoryUrl).toHaveBeenCalledTimes(1)
		expect(mockHandleArtifactoryUrl).toHaveBeenCalledWith(expect.any(Object))
	})

	test('renders the Xray URL input when showAdvancedUrl is true', () => {
		const customProps: Props = { ...props, showAdvancedUrl: true }
		const { getByLabelText } = render(<Url {...customProps} />)
		const xrayInputElement = getByLabelText('Xray URL') as HTMLInputElement
		expect(xrayInputElement).toBeInTheDocument()
		expect(xrayInputElement.type).toBe('text')
	})

	test('calls the handleXrayUrl function on Xray URL input change', () => {
		const customProps: Props = { ...props, showAdvancedUrl: true }
		const { getByLabelText } = render(<Url {...customProps} />)
		const xrayInputElement = getByLabelText('Xray URL') as HTMLInputElement
		fireEvent.change(xrayInputElement, { target: { value: 'https://xray.example.com' } })
		expect(mockHandleXrayUrl).toHaveBeenCalledTimes(1)
		expect(mockHandleXrayUrl).toHaveBeenCalledWith(expect.any(Object))
	})
})
