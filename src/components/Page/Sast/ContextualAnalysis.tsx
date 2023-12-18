import AnalysisStepsListElement from '../../UI/List/AnalysisStepsListElement'
import { IAnalysisStep } from '../../../model'
import { Collapse } from '../../UI/Collapse/Collapse'
import { ReactComponent as FlowSvg } from '../../../assets/icons/flow.svg'
export interface Props {
	analysisSteps?: IAnalysisStep[]
}

export default function ContextualAnalysis(props: Props): JSX.Element {
	return (
		<>
			{props.analysisSteps && props.analysisSteps.length > 0 && (
				<Collapse
					expanded
					header={
						<h1>
							<FlowSvg /> Data Trace Evidence
						</h1>
					}
				>
					<AnalysisStepsListElement items={props.analysisSteps} />
				</Collapse>
			)}
		</>
	)
}
