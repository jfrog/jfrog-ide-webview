import Wrapper from './Wrapper'
import css from './ContextualAnalysis.module.css'

export interface Props {
	foundText: string

}
const ContextualAnalysis = (props: Props) => (
	<>
		<Wrapper headline="WHAT WAS FOUND">
			<div className={css.container}>
				<div className={css.text}>
					{props.foundText}
				</div>

			</div>
		</Wrapper>
	</>
)

export default ContextualAnalysis