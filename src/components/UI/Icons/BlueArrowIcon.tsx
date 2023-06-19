export interface Props {
	className: string
}

export function BlueArrowIcon(props: Props): JSX.Element {
	return (
		<svg
			className={props.className}
			width="9"
			height="5"
			viewBox="0 0 9 5"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<rect
				x="-6.10352e-05"
				y="0.757385"
				width="1"
				height="6"
				rx="0.5"
				transform="rotate(-45 -6.10352e-05 0.757385)"
				fill="#00A8FC"
			/>
			<rect
				x="7.80008"
				y="0.050293"
				width="1"
				height="6"
				rx="0.5"
				transform="rotate(45 7.80008 0.050293)"
				fill="#00A8FC"
			/>
		</svg>
	)
}
