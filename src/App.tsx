import css from './App.module.css'
import Dependency from './components/Page/Dependency/Dependency'
import { useState, useMemo } from 'react'
import Sast from './components/Page/Sast/Sast'
import IaC from './components/Page/IaC/IaC'
import Secrets from './components/Page/Secrets/Secrets'
import { WebviewPage, PageType } from './model'
import { EventManager } from './api/eventManager'
import { eventManagerContext } from './store/eventContext'
import { Spinner, State } from './components/UI/Spinner/Spinner'
import { Login } from './components/Page/Login/Login'
import { StyledEngineProvider } from '@mui/material/styles'

/**
 * The main page on which the Webview will be drawn based on the incoming request page type.
 */
function App(): JSX.Element {
	const [data, setData] = useState<WebviewPage>({} as WebviewPage)

	const eventManager = useMemo(() => new EventManager(setData), [])
	let page

	switch (data.pageType) {
		case PageType.Dependency:
			page = <Dependency data={data} />
			break
		case PageType.Sast:
			page = <Sast data={data} />
			break
		case PageType.IaC:
			page = <IaC data={data} />
			break
		case PageType.Secrets:
			page = <Secrets data={data} />
			break
		case PageType.Login:
			page = <Login data={data} />
			break
		default:
			page = (
				<div className={css.loading}>
					<Spinner state={State.Loading} />
				</div>
			)
	}

	return (
		<div className={css.app}>
			<StyledEngineProvider injectFirst>
				<eventManagerContext.Provider value={eventManager}>
					<div className={css.appBody}>{page}</div>
				</eventManagerContext.Provider>
			</StyledEngineProvider>
		</div>
	)
}

export default App
