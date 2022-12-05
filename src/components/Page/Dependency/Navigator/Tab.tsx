import css from './Tab.module.css'
import { useState } from 'react'
import { ITab } from '../../../../model/tab'

export interface Props {
  items: ITab[]
  onChangeMenu: (index: number) => void
}

const Tab = (props: Props) => {
	const [selected, setSelected] = useState(0)
	const onClickHandler = (i: number) => {
		setSelected(i)
		props.onChangeMenu(i)
	}
	return (
		<>
			<div className={css.container}>
				{props.items.map((item, i) => (
					<button
						key={i}
						className={`${css.btn} ${selected === i ? css.btnHover : ''} ${
							item.hide ? css.btnNotAllowed : ''
						}`}
						onClick={onClickHandler.bind(null, i)}
						disabled={item.hide}>
						{item.text}
					</button>
				))}
			</div>
		</>
	)
}

export default Tab