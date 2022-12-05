import css from './App.module.css'
import Dependency from './components/Page/Dependency/Dependency'
import { IDependencyPage } from './model/dependencyPage'
import { PageType } from './model/pageType'

export interface Props {
  PanelType: PageType
  data?: IDependencyPage
}

function App(props: Props) {
	let page = <>Nothing to show</>
	if (props.data === undefined || props.PanelType === PageType.Empty) {
		return page
	}

	switch (props.PanelType) {
		case PageType.Dependency:
			page = <Dependency data={props.data}/>
	}

	return (
		<div className={css.App}>
			<div className={css['App-body']}>{page}</div>
		</div>
	)
}

export default App