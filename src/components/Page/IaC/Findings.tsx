import css from './Findings.module.css'
import Wrapper from '../../UI/Wrapper/Wrapper'
import Collapse from '../../UI/Collapse/Collapse'

export interface Props {
	snippet?: string;
  meaning?: string;
  happen?: string;
  do?: string;
}

const Findings = (props: Props) => (
	<>
		<Wrapper headline="FINDING">
			<span className={css.text}>{props.snippet}</span>
		</Wrapper>
		{props.meaning
			&& <Collapse header="What Does it mean?" text={props.meaning}/>}
		{props.happen
			&& <Collapse header="What can happen?" text={props.happen}/>}
		{props.do
			&& <Collapse header="What should I do?" text={props.do}/>}
	</>
)
export default Findings