import Row from '../../Row/Row'

interface ApplicabilityRowProps {
	title: string
	data: string
}

const ApplicabilityRow = ({ title, data }: ApplicabilityRowProps): JSX.Element => (
	<Row title={title} data={data} />
)

export default ApplicabilityRow
