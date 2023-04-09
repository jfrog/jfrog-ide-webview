import css from './ExpandButton.module.css'

export interface Props {
  isExpand: boolean
}

export default function ExpandButton(props: Props): JSX.Element {
	if (props.isExpand) {
		return (
			<div className={css.btn}>
				<div className={css.arrowUp}>
					<svg
						width={9}
						height={5}
						viewBox="0 0 9 5"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<rect
							x="8.5072"
							y="4.29291"
							width={1}
							height={6}
							rx="0.5"
							transform="rotate(135 8.5072 4.29291)"
							fill="#D3D3D4"/>
						<rect
							x="0.707031"
							y={5}
							width={1}
							height={6}
							rx="0.5"
							transform="rotate(-135 0.707031 5)"
							fill="#D3D3D4"/>
					</svg>

				</div>
				<span className={css.text}>Show Less</span>
			</div>
		)
	}

	return (
		<div className={css.btn}>
			<div className={css.arrowDown}>
				<svg
					width={9}
					height={5}
					viewBox="0 0 9 5"
					fill="none"
					xmlns="http://www.w3.org/2000/svg">
					<rect
						x="8.5072"
						y="4.29291"
						width={1}
						height={6}
						rx="0.5"
						transform="rotate(135 8.5072 4.29291)"
						fill="#D3D3D4"/>
					<rect
						x="0.707031"
						y={5}
						width={1}
						height={6}
						rx="0.5"
						transform="rotate(-135 0.707031 5)"
						fill="#D3D3D4"/>
				</svg>

			</div>
			<span className={css.text}>Show More</span>
		</div>
	)
}