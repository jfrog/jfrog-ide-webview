import { Collapse } from '../Collapse/Collapse'

export interface Props {
	snippet?: string
	meaning?: string
	happen?: string
	do?: string
}

export default function Findings(props: Props): JSX.Element {
	return (
		<>
			{props.snippet && <Collapse header="FINDING" content={props.snippet} />}
			{props.meaning && <Collapse header="What Does it mean?" content={props.meaning} />}
			{props.happen && <Collapse header="What can happen?" content={props.happen} />}
			{props.do && <Collapse header="What should I do?" content={props.do} />}
		</>
	)
}
