import css from './App.module.css'
import Dependency from './components/Page/Dependency/Dependency'
import { IDependencyPage } from './model/dependencyPage'
import { PageType } from './model/pageType'
import { useState } from 'react'

function App() {
	const [dependencyData, setDependencyData] = useState({} as IDependencyPage)
	const [pageType, setPageType] = useState(PageType.Empty as PageType)
	window.addEventListener('message', event => {
		setDependencyData(event.data.data)
		setPageType(event.data.pageType)
	})
	let page = <>Nothing to show</>
	if (pageType === PageType.Empty) {
		return page
	}

	switch (pageType) {
		case PageType.Dependency:
			page = <Dependency data={dependencyData}/>
			break
	}

	return (
		<div className={css.App}>
			<div className={css['App-body']}>{page}</div>
		</div>
	)
}

export default App