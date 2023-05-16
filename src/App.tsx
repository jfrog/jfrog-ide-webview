import css from './App.module.css'
import Dependency from './components/Page/Dependency/Dependency'
import { useState, useMemo } from 'react'
import Eos from './components/Page/Eos/Eos'
import IaC from './components/Page/IaC/IaC'
import Secrets from './components/Page/Secrets/Secrets'
import { WebviewPage, PageType } from './model/webviewPages'
import { EventManager } from './api/eventManager'
import { eventManagerContext } from './store/eventContext'

/**
 * The main page on which the Webview will be drawn based on the incoming request page type.
 */
function App(): JSX.Element {
	const [data, setDependencyData] = useState<WebviewPage>({} as WebviewPage)
	const eventManager = useMemo(() => new EventManager(setDependencyData), [])
	let page

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
		case PageType.Secrets:
			page = <Secrets data={data} />
			break
		default:
			page = <>Nothing to show</>
	}

	return (
		<div className={css.App}>
			<eventManagerContext.Provider value={eventManager}>
				<div className={css['App-body']}>{page}</div>
			</eventManagerContext.Provider>
		</div>
	)
}

export default App
