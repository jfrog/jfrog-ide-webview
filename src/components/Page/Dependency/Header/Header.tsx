import research from './../../../../assets/Research.svg'
import css from './Header.module.css'
import { ISeverity } from '../../../../model/severity'
import { getSeverityImage } from '../../../../utils/utils'
export interface Props {
  text: string
  Severity: ISeverity
  isResearch: boolean
}

const Header = (props: Props) => (
	<>
		<div className={css.container}>
			<img className={css.img} src={getSeverityImage(props.Severity)} alt="severity level"/>
			<span>{props.text}</span>
			{props.isResearch && (
				<img className={css.img} src={research} alt="Available Research information"/>
			)}
		</div>
	</>
)

export default Header