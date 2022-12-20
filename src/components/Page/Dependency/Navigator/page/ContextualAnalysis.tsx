import { IApplicableDetails } from '../../../../../model/cve'
import Wrapper from './Wrapper'
import css from './ContextualAnalysis.module.css'
import Row from '../../../../UI/Row/Row'
import ReactMarkdown from 'react-markdown'

export interface Props {
	data: IApplicableDetails

}
const ContextualAnalysis = (props: Props) => (
	<>
		<Wrapper headline="CONTEXTUAL ANALYSIS BREAKDOWN">
			<div className={css.container}>
				<div className={css.innerContainer}>
					<h4 className={css.header}>
						Why is this CVE applicable?
					</h4>

					<div className={css.text}>
						{props.data.reason}
					</div>
				</div>
				<div>
					<h4 className={css.smallHeader}>
						Analysis evidence:
					</h4>
					{props.data.evidence?.map((el, i) => (
						<div key={i}>
							{el.filePathEvidence && <Row title="Evidence file path" data={el.filePathEvidence} key={`file${i}`}/>}
							{el.codeEvidence && <Row title="Evidence code" data={el.codeEvidence} key={`code${i}`}/>}
						</div>))}
				</div>
			</div>
		</Wrapper>
		{props.data.searchTarget
				&& (
					<Wrapper>
						<div className={css.innerContainer}>
							<h4 className={css.smallHeader}>
								What does the scanner checks / looking for?
							</h4>

							<div className={css.text}>
								<ReactMarkdown className={css.text}>{props.data.searchTarget}</ReactMarkdown>
							</div>
						</div>
					</Wrapper>
				)
		}

	</>
)

export default ContextualAnalysis