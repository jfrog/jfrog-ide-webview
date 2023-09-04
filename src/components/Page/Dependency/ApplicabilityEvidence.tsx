import { IApplicableDetails } from '../../../model'
import { Collapse } from '../../UI/Collapse/Collapse'
import TypographyCss from '../../../styles/Typography.module.css'
import LayoutCss from '../../../styles/Layout.module.css'
import React from 'react'
import { ReactComponent as EvidenceSvg } from '../../../assets/icons/evidence.svg'
import Row from '../../UI/Row/Row'
import Divider from '../../UI/Divider/Divider'
import Markdown from '../../UI/Markdown/Markdown'

export interface Props {
	data: IApplicableDetails
}

export default function ApplicabilityEvidence(props: Props): JSX.Element {
	return (
		<Collapse
			header={
				<h1>
					<EvidenceSvg /> Applicability Evidence
				</h1>
			}
			content={
				<div className={LayoutCss.defaultContainer}>
					{props.data.isApplicable && (
						<>
							<div>
								<h6 className={TypographyCss.subtitle} style={{ marginBottom: '20px' }}>
									Why is this CVE applicable?
								</h6>
								<div className={LayoutCss.rowList}>
									{props.data.evidence?.map((evidence, i) => (
										<div key={i}>
											<Row title="Reason" data={evidence.reason} />
											<Row title="Evidence file path" data={evidence.filePathEvidence} />
											<Row title="Evidence code" data={evidence.codeEvidence} />
										</div>
									))}
								</div>
							</div>
							<Divider />
						</>
					)}
					<h6 className={TypographyCss.subtitle}>What does the scanner checks/look for?</h6>
					<Markdown text={props.data.searchTarget} />
				</div>
			}
		/>
	)
}
