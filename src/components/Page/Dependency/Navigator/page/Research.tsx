import css from './Research.module.css'
import ReactMarkdown from 'react-markdown'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import vscDarkPlus from 'react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus'
import { IExtendedInformation } from '../../../../../model/extendedInformation'
import Wrapper from '../../../../UI/Wrapper/Wrapper'

interface Props {
  data: IExtendedInformation
}

const Research = (props: Props): JSX.Element => (
	<>
		<Wrapper headline="SUMMARY">
			<span className={css.text}>{props.data.shortDescription}</span>
		</Wrapper>
		{props.data.remediation && (
			<Wrapper headline="REMEDIATION">
				<ReactMarkdown className={css.text}>{props.data.remediation}</ReactMarkdown>
			</Wrapper>
		)}
		<Wrapper headline="DETAILS">
			<ReactMarkdown
				className={css.text}
				components={{
					// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/explicit-function-return-type
					code({ inline, className, children, style, ...props }) {
						const match = /language-(\w+)/.exec(className ?? css.text)
						return !inline && match ?
							(
								<SyntaxHighlighter
									style={vscDarkPlus}
									className={css.text}
									language={match[1]}
									PreTag="div"
									{...props}>{String(children).replace(/\n\r$/, '')}
								</SyntaxHighlighter>
							) :
							(
								<code className={className} {...props}>
									{children}
								</code>
							)
					}
				}}>{props.data.fullDescription}
			</ReactMarkdown>
		</Wrapper>
		{props.data.jfrogResearchSeverityReason && (
			<Wrapper headline="JFROG RESEARCH SEVERITY REASONS">
				<div className={css.container}>
					{props.data.jfrogResearchSeverityReason
						// eslint-disable-next-line @typescript-eslint/no-unused-vars
						.sort((reasonA, reasonB) => reasonA.isPositive ? 1 : -1)
						.map((reason, i) => (
							<div key={i}>
								<h4 className={reason.isPositive ? css.positiveReason : css.negativeReason}>
									{reason.name}
								</h4>
								{reason.description && (
									<ReactMarkdown
										className={css.text}
										components={{
											// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/explicit-function-return-type
											code({ inline, className, children, style, ...props }) {
												const match = /language-(\w+)/.exec(className ?? css.text)
												return !inline && match ?
													(
														<SyntaxHighlighter
															style={vscDarkPlus}
															className={css.text}
															language={match[1]}
															PreTag="div"
															{...props}>{String(children).replace(/\n\r$/, '')}
														</SyntaxHighlighter>
													) :
													(
														<code className={className} {...props}>
															{children}
														</code>
													)
											}
										}}>{reason.description}
									</ReactMarkdown>
								)}
							</div>
						))}
				</div>
			</Wrapper>
		)}
	</>
)

export default Research