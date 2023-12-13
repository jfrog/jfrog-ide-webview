import { Button } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import css from './CopyButton.module.css'

export interface Props {
	copyText: string
}

const handleClick = (text: string): void => {
	navigator.clipboard.writeText(text)
}

export default function copyButton(props: Props): JSX.Element {
	return (
		<Button
			onClick={(): void => {
				handleClick(props.copyText)
			}}
			className={css.btn}
			startIcon={<ContentCopyIcon />}
		/>
	)
}
