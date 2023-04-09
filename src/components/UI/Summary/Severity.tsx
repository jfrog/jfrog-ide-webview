import Row from '../Row/Row'
import { ISeverity } from '../../../model'
interface Props{
    severity: ISeverity
}
const Severity = (props: Props): JSX.Element => (<Row title="Severity" data={props.severity}/>)

export default Severity