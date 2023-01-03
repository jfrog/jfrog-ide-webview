import css from './Header.module.css'
import { ISeverity } from './../../../model/severity'
import { getSeverityImage, getResearchImg } from './../../../utils/utils'
export interface Props {
  text: string
  Severity: ISeverity
  isResearch: boolean
}

const Header = (props: Props) => (
	<>
		<div className={css.container}>
			<div className={css.img}>
				{getSeverityImage(props.Severity)}
			</div>
			<span>{props.text}</span>
			{props.isResearch && (
				<div className={css.img}>
					{getResearchImg()}
				</div>
			)}
		</div>
	</>
)

export default Header