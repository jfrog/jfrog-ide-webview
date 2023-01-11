import css from './App.module.css'
import Dependency from './components/Page/Dependency/Dependency'
import { IDependencyPage } from './model/dependencyPage'
import { PageType } from './model/pageType'
import { useState } from 'react'
import ZeroDay from './components/Page/ZeroDay/ZeroDay'
import { IZeroDayPage } from './model/zeroDayPage'

function App() {
	const [data, setDependencyData] = useState<IDependencyPage | IZeroDayPage>({} as IDependencyPage | IZeroDayPage)
	window.addEventListener('message', event => {
		setDependencyData(event.data.data)
	})
	let page = <></>

	switch (data.pageType) {
		case PageType.Dependency:
			page = <Dependency data={data}/>
			break
		case PageType.ZeroDays:
			page = <ZeroDay data={data}/>
			break
		default:
			page = <>Nothing to show</>
	}

	return (
		<div className={css.App}>
			<div className={css['App-body']}>{page}</div>
		</div>
	)
}

export default App