import SyntaxHighlighter from 'react-syntax-highlighter'
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import css from './CodeBlock.module.css'

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
			<SyntaxHighlighter id={props.id} language="javascript" style={docco} customStyle={{ backgroundColor: 'transparent', maxWidth: '500px', overflowX: 'hidden', textAlign: 'left' }}>
				{props.codeString}
			</SyntaxHighlighter>
			{ isOverflow()
				&& <div className={css.ellipsis}> ... </div>}
		</>
	)
}

export default CodeBlock