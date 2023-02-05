import css from './Description.module.css'
import Wrapper from '../../UI/Wrapper/Wrapper'

interface Props {
  description?: string
}

const Description = (props: Props) => (
	<>
		{props.description && props.description.length > 0
		&& <Wrapper headline="DESCRIPTION">
			<span className={css.text}>{props.description}</span>
		   </Wrapper>
		}
	</>
)

export default Description