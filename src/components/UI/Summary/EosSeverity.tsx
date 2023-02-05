import Row from '../Row/Row'
import { ISeverity } from '../../../model'
interface Props{
    severity: ISeverity
}
const EosSeverity = (props: Props) => (<Row title="Severity" data={props.severity}/>)

export default EosSeverity