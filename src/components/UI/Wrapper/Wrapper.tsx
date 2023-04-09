import css from './Wrapper.module.css'

export interface Props {
  headline?: string
  children?: React.ReactNode
}

const Wrapper = (props: Props): JSX.Element => (
	<>
		{props.headline && <div className={css.headline}>{props.headline}</div>}
		<div className={css.content}>

			{props.children}
		</div>
		<div className={css.line}/>
	</>
)

export default Wrapper