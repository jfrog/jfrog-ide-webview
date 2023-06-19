import { LoginProgressStatus } from '../../../model/login'
import { ILoginPage } from '../../../model/webviewPages'
import Wrapper from '../../UI/Wrapper/Wrapper'
import { Form } from './Form'
import { Header } from './Header'
import css from './Login.module.css'
import { useState, useEffect } from 'react'
import { LoginModal } from '../../UI/Modal/pages/LoginModal'

export interface Props {
	data: ILoginPage
}

export function Login(props: Props): JSX.Element {
	const [modal, setModal] = useState(props.data.status !== LoginProgressStatus.Initial)

	useEffect(() => {
		setModal(props.data.status !== LoginProgressStatus.Initial)
	}, [props.data.status])

	const closeModal = (): void => {
		setModal(false)
	}

	return (
		<div className={css.container}>
			{modal && <LoginModal onClose={closeModal} loginData={props.data} />}
			<Wrapper>
				<div className={css.header}>
					<Header />
				</div>
			</Wrapper>
			<Wrapper>
				<div className={css.form}>
					<Form />
				</div>
			</Wrapper>
		</div>
	)
}
