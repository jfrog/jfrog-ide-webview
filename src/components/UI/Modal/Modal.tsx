import css from './Modal.module.css'
import ReactDOM from 'react-dom'

export interface PropsBackdrop {
	onClose: () => void
}

function Backdrop(props: PropsBackdrop): JSX.Element {
	return <div className={css.backdrop} onClick={props.onClose} />
}

interface modalProps {
	children: React.ReactNode
}

function ModalOverlay(props: modalProps): JSX.Element {
	return (
		<div className={css.modal}>
			<div className={css.content}>{props.children}</div>
		</div>
	)
}

export interface Props {
	children: React.ReactNode
	onClose: () => void
}

export function Modal(props: Props): JSX.Element {
	const overlayElement: HTMLElement | null = document.getElementById('overlay')

	if (!overlayElement) {
		throw new Error('The element #overlay was not found')
	}

	return (
		<>
			{ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, overlayElement)}
			{ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, overlayElement)}
		</>
	)
}
