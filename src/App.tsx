import css from './App.module.css'
import Dependency from './components/Page/Dependency/Dependency'
import ZeroDay from './components/Page/ZeroDay/ZeroDay'
import { IZeroDayPage } from './model/zeroDayPage'
import { IDependencyPage } from './model/dependencyPage'
import { PageType } from './model/pageType'

export interface Props {
  PanelType: PageType
  dependencyPageData?: IDependencyPage
  zeroDayPageData?: IZeroDayPage
}

function App(props: Props) {
	let page = <>Nothing to show</>
	if (props.PanelType === PageType.Empty) {
		return page
	}

	switch (props.PanelType) {
		case PageType.Dependency:
			if (props.dependencyPageData) {
				page = <Dependency data={props.dependencyPageData}/>
			}
			break
		case PageType.ZeroDays:
			if (props.zeroDayPageData) {
				page = <ZeroDay data={props.zeroDayPageData}/>
			}
			break
	}

	return (
		<div className={css.App}>
			<div className={css['App-body']}>{page}</div>
		</div>
	)
}

export default App