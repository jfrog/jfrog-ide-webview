import AnalysisStepsListElement from '../../UI/List/AnalysisStepsListElement'
import { IAnalysisStep } from '../../../model'
import { Collapse } from '../../UI/Collapse/Collapse'
import { ReactComponent as FlowSvg } from '../../../assets/icons/flow.svg'
import React from 'react'
export interface Props {
	analysisSteps?: IAnalysisStep[]
}

export default function ContextualAnalysis(props: Props): JSX.Element {
	return (
		<>
			{props.analysisSteps && props.analysisSteps.length > 0 && (
				<Collapse
					header={
						<h1>
							<FlowSvg /> Data Flow Analysis Evidence
						</h1>
					}
					content={<AnalysisStepsListElement items={props.analysisSteps} />}
				/>
			)}
		</>
	)
}
