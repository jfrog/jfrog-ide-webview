import AnalysisStepsListElement from '../../UI/List/AnalysisStepsListElement'
import { IAnalysisStep } from '../../../model/analysisStep'
import { Collapse } from "../../UI/Collapse/Collapse"
import flowSvg from "../../../assets/icons/flow.svg"
import React from "react"

export interface Props {
	// foundText?: string
	analysisSteps?: IAnalysisStep[]
}

export default function ContextualAnalysis(props: Props): JSX.Element {
	return (
		<>
			{props.analysisSteps && props.analysisSteps.length > 0 && (
				<Collapse
					header={<h1><img src={flowSvg}/> Data Flow Analysis Evidence</h1>}
					content={<AnalysisStepsListElement items={props.analysisSteps} />}/>
			)}
		</>
	)
}
