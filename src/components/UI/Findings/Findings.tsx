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
			{props.snippet && <Collapse header="FINDING" text={props.snippet} id="snippet" />}
			{props.meaning && <Collapse header="What Does it mean?" text={props.meaning} id="meaning" />}
			{props.happen && <Collapse header="What can happen?" text={props.happen} id="happen" />}
			{props.do && <Collapse header="What should I do?" text={props.do} id="do" />}
		</>
	)
}
