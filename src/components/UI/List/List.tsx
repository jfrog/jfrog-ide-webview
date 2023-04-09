interface Props {
    children?: React.ReactNode
}
const List = (props: Props): JSX.Element => (
	<ul>
		{props.children}
	</ul>
)

export default List