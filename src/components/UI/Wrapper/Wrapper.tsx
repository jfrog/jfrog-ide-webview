import css from './Wrapper.module.css'

export interface Props {
  headline?: string
  children?: React.ReactNode
}

export default function Wrapper(props: Props): JSX.Element {
	return (
		<>
			{props.headline && <div className={css.headline}>{props.headline}</div>}
			<div className={css.content}>

				{props.children}
			</div>
			<div className={css.line}/>
		</>
	)
}