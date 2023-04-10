import SyntaxHighlighter from 'react-syntax-highlighter'
import css from './CodeBlock.module.css'
import vscDarkPlus from 'react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus'

export interface Props {
    codeString: string
	id: string

}

export default function CodeBlock(props: Props): JSX.Element {
	const isOverflow = (): boolean | null => {
		const element = document.getElementById(props.id)
		return element && element.clientWidth > 500
	}

	return (
		<>
			<SyntaxHighlighter id={props.id} language="javascript" style={vscDarkPlus} customStyle={{ padding: 0, backgroundColor: 'transparent', maxWidth: '500px', overflowX: 'hidden', textAlign: 'left' }}>
				{props.codeString}
			</SyntaxHighlighter>
			{ isOverflow() &&
				<div className={css.ellipsis}> ... </div> }
		</>
	)
}