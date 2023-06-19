import { ISeverity } from '../../../model/severity'
import Row from '../Row/Row'

export interface Props {
	severity: ISeverity
}

export default function Severity(props: Props): JSX.Element {
	return <Row title="Severity" data={props.severity} />
}
