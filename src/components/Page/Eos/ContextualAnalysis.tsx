import css from './ContextualAnalysis.module.css'
import List from '../../UI/List/List'
import AnalysisStepsListElement from '../../UI/List/AnalysisStepsListElement'
import { IAnalysisStep } from '../../../model/analysisStep'
import Wrapper from '../../UI/Wrapper/Wrapper'

export interface Props {
	foundText?: string
	analysisSteps?: IAnalysisStep[]
}

export default function ContextualAnalysis(props: Props): JSX.Element {
	return (
		<>
			{props.foundText && (
				<Wrapper headline="WHAT WAS FOUND">
					<div className={css.container}>
						<div className={css.text}>{props.foundText}</div>
					</div>
				</Wrapper>
			)}
			{props.analysisSteps && props.analysisSteps.length > 0 && (
				<Wrapper headline="DATA FLOW ANALYSIS">
					<div>
						<List>
							<AnalysisStepsListElement items={props.analysisSteps} />
						</List>
					</div>
				</Wrapper>
			)}
		</>
	)
}
