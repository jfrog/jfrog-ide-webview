import css from './Wrapper.module.css'

export interface Props {
  headline?: string
  children?: React.ReactNode
}

const Wrapper = (props: Props) => (
	<>
		{props.headline && <h3 className={css.headline}>{props.headline}</h3>}
		{props.children}
		<div className={css.line}/>
	</>
)

export default Wrapper