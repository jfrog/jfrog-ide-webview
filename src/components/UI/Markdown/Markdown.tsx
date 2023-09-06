import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import vscDarkPlus from 'react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus'
import css from './Markdown.module.css'

interface Props {
	text: string
}

export default function Markdown(props: Props): JSX.Element {
	return (
		<ReactMarkdown
			className={css.text}
			components={{
				// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/explicit-function-return-type
				code({ inline, className, children, style, ...props }) {
					const match = /language-(\w+)/.exec(className ?? css.text)
					return !inline && match ? (
						<SyntaxHighlighter
							style={vscDarkPlus}
							className={css.text}
							language={match[1]}
							PreTag="div"
							{...props}
						>
							{String(children).replace(/\n\r$/, '')}
						</SyntaxHighlighter>
					) : (
						<code className={css.inlineCode} {...props}>
							{children}
						</code>
					)
				}
			}}
		>
			{props.text}
		</ReactMarkdown>
	)
}
