import css from './Header.module.css'
import { ISeverity } from './../../../model/severity'
import { getSeverityImage, getResearchImg } from './../../../utils/utils'
export interface Props {
	text: string
	Severity: ISeverity
	isResearch: boolean
}

export default function Header(props: Props): JSX.Element {
	return (
		<div className={css.container}>
			<div className={css.img}>{getSeverityImage(props.Severity)}</div>
			<span>{props.text}</span>
			{props.isResearch && <div className={css.img}>{getResearchImg()}</div>}
		</div>
	)
}
