import Row from '../Row/Row'
interface Props{
    abbreviation: string
}
export default function Abbreviation(props: Props): JSX.Element { return (<Row title="Abbreviation" data={props.abbreviation}/>) }