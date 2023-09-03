import css from './Wrapper.module.css'

export interface Props {
	headline?: string
	children?: React.ReactNode
	hideLine?: boolean
}

export default function Wrapper(props: Props): JSX.Element {
	return (
		<>
			{props.headline && <div className={css.headline}>{props.headline}</div>}
			<div className={css.content}>{props.children}</div>
			{!props.hideLine && <div className={css.line} />}
		</>
	)
}
