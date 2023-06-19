import css from './Research.module.css'
import ReactMarkdown from 'react-markdown'
import { IExtendedInformation } from '../../../../../model/extendedInformation'
import Wrapper from '../../../../UI/Wrapper/Wrapper'
import Markdown from '../../../../UI/Markdown/Markdown'

export interface Props {
	data: IExtendedInformation
}

export default function Research(props: Props): JSX.Element {
	return (
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
				<Markdown text={props.data.fullDescription} />
			</Wrapper>
			{props.data.jfrogResearchSeverityReason && (
				<Wrapper headline="JFROG RESEARCH SEVERITY REASONS">
					<div className={css.container}>
						{props.data.jfrogResearchSeverityReason
							// eslint-disable-next-line @typescript-eslint/no-unused-vars
							.sort((reasonA, reasonB) => (reasonA.isPositive ? 1 : -1))
							.map((reason, i) => (
								<div key={i}>
									<h4 className={reason.isPositive ? css.positiveReason : css.negativeReason}>
										{reason.name}
									</h4>
									{reason.description && <Markdown text={reason.description} />}
								</div>
							))}
					</div>
				</Wrapper>
			)}
		</>
	)
}
