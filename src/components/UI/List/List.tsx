interface Props {
	children?: React.ReactNode
}

export default function List(props: Props): JSX.Element {
	return <ul>{props.children}</ul>
}
