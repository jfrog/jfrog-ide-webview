import css from './Research.module.css'
import Wrapper from '../../UI/Wrapper/Wrapper'
import MarkDown from '../../UI/MarkDown/MarkDown'

interface Props {
	description?: string
	remediation?: string[]
}

export default function Research(props: Props): JSX.Element {
	return (
		<>
			{
				props.description && props.description.length > 0 &&
				<Wrapper headline="DESCRIPTION">
					<span className={css.text}>{props.description}</span>
				</Wrapper>
			}
			{
				props.remediation && props.remediation.length > 0 &&
				<Wrapper headline="REMEDIATION">
					<div className={css.container}>
						{props.remediation
							.map((reason, i) => (
								<div key={i}>
									<MarkDown text={reason}/>
								</div>
							))}
					</div>
				</Wrapper>
			}
		</>
	)
}