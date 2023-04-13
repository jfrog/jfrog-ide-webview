import css from './Edited.module.css'

export interface Props {
	date: string
}

export default function Edited(props: Props): JSX.Element {
	return (
		<div className={css.container}>
			<div>JFrog Research last updated on {new Date(props.date).toUTCString()}</div>
			JFrog Research is different than NVD information
		</div>
	)
}
