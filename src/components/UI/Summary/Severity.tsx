import { ISeverity } from '../../../model/severity'
import Row from '../Row/Row'
interface Props {
	severity: ISeverity
}

export default function Severity(props: Props): JSX.Element {
	return <Row title="Severity" data={props.severity} />
}
