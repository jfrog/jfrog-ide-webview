import css from './Tab.module.css'
import { useState } from 'react'
import { ITab, ActiveTab } from '../../../../model/tab'

export interface Props {
  items: ITab[]
  activeTab: ActiveTab
  onChangeMenu: (index: ActiveTab) => void
}

const Tab = (props: Props) => {
	const onClickHandler = (tabKey: ActiveTab) => {
		props.onChangeMenu(tabKey)
	}
	return (
		<>
			<div className={css.container}>
				{props.items.filter(tab => !tab.hide).map((item, i) => (
					<button
						key={i}
						className={`${css.btn} ${props.activeTab === item.tabKey ? css.btnHover : ''} ${
							item.hide ? css.btnNotAllowed : ''
						}`}
						onClick={onClickHandler.bind(null, item.tabKey)}>
						{item.text}
					</button>
				))}
			</div>
		</>
	)
}

export default Tab