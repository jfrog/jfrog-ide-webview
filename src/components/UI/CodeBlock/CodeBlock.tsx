import SyntaxHighlighter from 'react-syntax-highlighter'
import css from './CodeBlock.module.css'
import vscDarkPlus from 'react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus'

export interface Props {
    codeString: string
	id: string

}

const CodeBlock = (props: Props) => {
	const isOverflow = () => {
		const element = document.getElementById(props.id)
		return element && element.clientWidth > 500
	}

	return (
		<>
			<SyntaxHighlighter id={props.id} language="javascript" style={vscDarkPlus} customStyle={{ backgroundColor: 'transparent', maxWidth: '500px', overflowX: 'hidden', textAlign: 'left' }}>
				{props.codeString}
			</SyntaxHighlighter>
			{ isOverflow()
				&& <div className={css.ellipsis}> ... </div>}
		</>
	)
}

export default CodeBlock