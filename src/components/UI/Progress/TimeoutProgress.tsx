import * as React from 'react'
import { useEffect } from 'react'
import Progress from './Progress'

export interface Props {
	timeoutMs: number
}

export function timeRemainTillExpired(endTime: number, timeoutMs: number): number {
	return Math.max(((endTime - Date.now()) / timeoutMs) * 100, 0)
}

export default function TimeoutProgress(props: Props): JSX.Element {
	const [progressLevel, setProgressLevel] = React.useState(0)

	useEffect(() => {
		const endTime = Date.now() + props.timeoutMs
		const timer = setInterval(() => {
			setProgressLevel(timeRemainTillExpired(endTime, props.timeoutMs))
		}, 500)

		return () => {
			clearInterval(timer)
		}
	}, [props.timeoutMs])

	return (
		<div>
			<Progress data-testid="progress-component" progressLevel={progressLevel} />
		</div>
	)
}
