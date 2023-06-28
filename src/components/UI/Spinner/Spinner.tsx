import { InfoIcon } from '../Icons/InfoIcon'
import css from './Spinner.module.css'

export enum State {
	Loading = 0,
	Fail = 1,
	Success = 2,
	AutoConnect = 3
}

export interface Props {
	state: State
}

export function Spinner(props: Props): JSX.Element {
	let className = css.loader

	if (props.state === State.Success) {
		className = css.checkmark
	}

	if (props.state === State.Fail) {
		className = css.xmark
	}

	let body = <> </>

	if (props.state === State.AutoConnect) {
		body = <InfoIcon />
	} else {
		body = (
			<div className={` ${className}`}>
				<svg>
					<defs>
						<filter id="goo">
							<feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
							<feColorMatrix
								in="blur"
								mode="matrix"
								values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 5 -2"
								result="gooey"
							/>
							<feComposite in="SourceGraphic" in2="gooey" operator="atop" />
						</filter>
					</defs>
					{props.state === State.Success && (
						<g className={css.checkmark}>
							<path d="M6.5 14L12 19L21.5 9" />
						</g>
					)}
				</svg>
			</div>
		)
	}

	return <>{body}</>
}
