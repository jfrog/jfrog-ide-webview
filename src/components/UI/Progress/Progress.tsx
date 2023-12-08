import LinearProgress from '@mui/material/LinearProgress'

export interface Props {
	progressLevel: number
}

export default function Progress(props: Props): JSX.Element {
	return (
		<div>
			<LinearProgress color="inherit" variant="determinate" value={props.progressLevel} />
		</div>
	)
}
