import ArrowDown from '../ArrowDown/ArrowDown'
import ArrowUp from '../ArrowUp/ArrowUp'
import css from './ExpandButton.module.css'

export interface Props {
	isExpand: boolean
	showText?: boolean
}

export default function ExpandButton(props: Props): JSX.Element {
	if (props.isExpand) {
		return (
			<div className={css.btn}>
				<div className={css.arrowUp}>
					<ArrowUp />
				</div>
				{props.showText && <span className={css.text}>Show Less</span>}
			</div>
		)
	}

	return (
		<div className={css.btn}>
			<div className={css.arrowDown}>
				<ArrowDown />
			</div>
			{props.showText && <span className={css.text}>Show More</span>}
		</div>
	)
}
