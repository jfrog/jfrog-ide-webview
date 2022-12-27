interface Props {
    children?: React.ReactNode
}
const List = (props: Props) => (
	<ul>
		{props.children}
	</ul>
)

export default List