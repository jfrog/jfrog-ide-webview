import css from './App.module.css'
import Dependency from './components/Page/Dependency/Dependency'
import { IDependencyPage } from './model/dependencyPage'
import { PageType } from './model/pageType'
import { useState } from 'react'
import Eos from './components/Page/Eos/Eos'
import { IEosPage } from './model/EosPage'
import { IIaCPage } from './model/IaCPage'
import IaC from './components/Page/IaC/IaC'

/**
 * The main page on which the Webview will be drawn based on the incoming request page type.
 */
function App(): JSX.Element {
	const [data, setDependencyData] = useState<IDependencyPage | IEosPage | IIaCPage>(
		{} as IDependencyPage | IEosPage
	)
	let page

	window.addEventListener('message', event => {
		setDependencyData(event.data.data)
	})

	switch (data.pageType) {
		case PageType.Dependency:
			page = <Dependency data={data} />
			break
		case PageType.Eos:
			page = <Eos data={data} />
			break
		case PageType.IaC:
			page = <IaC data={data} />
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
