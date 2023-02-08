import Collapse from '../../UI/Collapse/Collapse'

export interface Props {
	snippet?: string;
  meaning?: string;
  happen?: string;
  do?: string;
}

const Findings = (props: Props) => (
	<>
		{props.snippet
            && <Collapse header="FINDING" text={props.snippet}/>}
		{props.meaning
			&& <Collapse header="What Does it mean?" text={props.meaning}/>}
		{props.happen
			&& <Collapse header="What can happen?" text={props.happen}/>}
		{props.do
			&& <Collapse header="What should I do?" text={props.do}/>}
	</>
)
export default Findings