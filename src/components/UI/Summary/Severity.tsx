import Row from '../Row/Row'
import { ISeverity } from '../../../model'
interface Props{
    severity: ISeverity
}

export default function Severity(props: Props): JSX.Element { return (<Row title="Severity" data={props.severity}/>) }