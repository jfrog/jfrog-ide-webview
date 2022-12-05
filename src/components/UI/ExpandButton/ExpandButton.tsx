import css from './ExpandButton.module.css'
import arrow from './../../../assets/Expand.svg'

export interface Props {
  isExpand: boolean
}

const ExpandButton = (props: Props) => {
	if (props.isExpand) {
		return (
			<>
				<label className={css.btn}>
					<img className={css.arrowUp} src={arrow} alt="arrow-up"/>
					<span className={css.text}>Show Less</span>
				</label>
			</>
		)
	}

	return (
		<>
			<label className={css.btn}>
				<img className={css.arrowDown} src={arrow} alt="arrow-down"/>
				<span className={css.text}>Show More</span>
			</label>
		</>
	)
}

export default ExpandButton