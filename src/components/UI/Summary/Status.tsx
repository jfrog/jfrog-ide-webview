import Row from '../Row/Row'
import css from './Status.module.css'

interface Props {
    status: string
}

const Status = (props: Props): JSX.Element => {
	const stat = (
		<div>
			<Row title="Status" data="">
				<label className={css.purpleBox}> {props.status} </label>
			</Row>
		</div>
	)

	return (
		<>
			{stat}
		</>
	)
}

export default Status