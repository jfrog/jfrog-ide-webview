import css from './App.module.css'
import { PageType } from './model/pageType'
import { useState } from 'react'
import Eos2 from './components/Page/Eos2/Eos2'
import { IEos2Page } from './model/Eos2Page'

function App() {
	const [dependencyData, setDependencyData] = useState({
		'header': 'SQL Injection',
		'pageType': PageType.Eos2
	} as IEos2Page)

	const [pageType, setPageType] = useState(PageType.Eos as PageType)
	let page = <>Nothing to show</>
	if (pageType === PageType.Empty) {
		return page
	}

	switch (pageType) {
		case PageType.Eos2:
			page = <Eos2 data={dependencyData}/>
			break
	}

	return (
		<div className={css.App}>
			<div className={css['App-body']}>{page}</div>
		</div>
	)
}


export default App