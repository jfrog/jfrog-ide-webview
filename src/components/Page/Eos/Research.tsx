import css from './Research.module.css'
import ReactMarkdown from 'react-markdown'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import vscDarkPlus from 'react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus'
import Wrapper from '../../UI/Wrapper/Wrapper'

interface Props {
  description?: string
  remediation?: string[]
}

const Research = (props: Props) => (
	<>
		{props.description && props.description.length > 0
		&& <Wrapper headline="DESCRIPTION">
			<span className={css.text}>{props.description}</span>
		   </Wrapper>
		}
		{
			props.remediation && props.remediation.length > 0
			&& <Wrapper headline="REMEDIATION">
				<div className={css.container}>
					{props.remediation
						.map((reason, i) => (
							<div key={i}>
								<ReactMarkdown
									className={css.text}
									components={{
										// eslint-disable-next-line @typescript-eslint/no-unused-vars
										code({ inline, className, children, style, ...props }) {
											const match = /language-(\w+)/.exec(className || css.text)
											return !inline && match
												? (
													<SyntaxHighlighter
														style={vscDarkPlus}
														className={css.text}
														language={match[1]}
														PreTag="div"
														{...props}>{String(children).replace(/\n\r$/, '')}
													</SyntaxHighlighter>
												)
												: (
													<code className={className} {...props}>
														{children}
													</code>
												)
										}
									}}>{reason}
								</ReactMarkdown>
							</div>
						))}
				</div>
			   </Wrapper>
		}

	</>
)

export default Research