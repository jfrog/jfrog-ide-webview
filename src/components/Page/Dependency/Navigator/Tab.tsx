import css from './Tab.module.css'
import { ITab, ActiveTab } from '../../../../model/tab'

export interface Props {
  tabs: ITab[]
  activeTab: ActiveTab
  onChangeMenu: (index: ActiveTab) => void
}

const Tab = (props: Props): JSX.Element => {
	const onClickHandler = (tabKey: ActiveTab): void => {
		props.onChangeMenu(tabKey)
	}
	const tabs: JSX.Element[] = []
	props.tabs.forEach(value => {
		if (!value.hide) {
			tabs.push(
				<button
					key={value.text}
					className={`${css.btn} ${props.activeTab === value.tabKey ? css.btnHover : ''}`}
					onClick={onClickHandler.bind(null, value.tabKey)}>
					{value.text}
				</button>
			)
		}
	})
	return (
		<div className={css.container}>
			{tabs}
		</div>
	)
}

export default Tab