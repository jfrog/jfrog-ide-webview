import Row from '../Row/Row'
import css from './Status.module.css'

export interface Props {
	status: string
}

export default function Status(props: Props): JSX.Element {
	return (
		<div>
			<Row title="Status" data="">
				<label className={css.purpleBox}> {props.status} </label>
			</Row>
		</div>
	)
}
