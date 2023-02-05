import css from './App.module.css'
import { PageType } from './model/pageType'
import { useState } from 'react'
import IaC from './components/Page/IaC/IaC'
import { IIaCPage } from './model/IaCPage'
import { ISeverity } from './model/severity'


function App() {
	const [dependencyData, setDependencyData] = useState({
		'header': 'SQL Injection',
		'pageType': PageType.IaC,
		'severity': ISeverity.Critical,
		'status': 'TO FIX',
		'id': 'EXP-1527-00001'
	} as IIaCPage)

	const [pageType, setPageType] = useState(PageType.IaC as PageType)
	let page = <>Nothing to show</>
	if (pageType === PageType.Empty) {
		return page
	}

	switch (pageType) {
		case PageType.IaC:
			page = <IaC data={dependencyData}/>
			break
	}

	return (
		<div className={css.App}>
			<div className={css['App-body']}>{page}</div>
		</div>
	)
}


export default App