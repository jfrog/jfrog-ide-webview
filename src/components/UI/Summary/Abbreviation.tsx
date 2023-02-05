import Row from '../Row/Row'
interface Props{
    abbreviation: string
}
const Abbreviation = (props: Props) => (<Row title="Abbreviation" data={props.abbreviation}/>)

export default Abbreviation