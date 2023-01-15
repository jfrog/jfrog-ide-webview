import css from './ContextualAnalysis.module.css'
import List from '../../../../UI/List/List'
import ZeroDayListElement from '../../../../UI/List/ZeroDayListElement'
import { IAnalysisStep } from '../../../../../model/zeroDayPage'
import Wrapper from '../../../../UI/Wrapper/Wrapper'

export interface Props {
	foundText?: string
	analysisSteps: IAnalysisStep[]

}
const ContextualAnalysis = (props: Props) => (
	<>
		{props.foundText
		&& <Wrapper headline="WHAT WAS FOUND">
			<div className={css.container}>
				<div className={css.text}>
					{props.foundText}
				</div>
			</div>
		   </Wrapper>}
		<Wrapper headline="ANALYSIS STEPS">
			<div>
				<List>
					<ZeroDayListElement items={props.analysisSteps}/>
				</List>
			</div>

		</Wrapper>
	</>
)

export default ContextualAnalysis