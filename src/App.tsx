import css from './App.module.css'
import { PageType } from './model/pageType'
import { useState } from 'react'
import Eos from './components/Page/Eos/Eos'
import { IEosPage } from './model/EosPage'
import { ISeverity } from './model/severity'

function App() {
	const [dependencyData, setDependencyData] = useState({
		'header': 'SQL Injection',
		'severity': ISeverity.Low,
		'pageType': PageType.Eos,
		'location': {
			'file': '/Users/assafa/Documents/code/flask-webgoat/flask_webgoat/__init__.py',
			'row': 14,
			'colum': 15
		},
		'description': '\n    SQL injection is a type of vulnerability that allows an attacker to execute arbitrary SQL\n    commands on a database.\n    This can allow the attacker to gain access to sensitive information, such as user credentials\n    or sensitive data, or to perform unauthorized actions, such as deleting or modifying data.\n\n    In this query we check if a user input can flow un-sanitized into the DB in order to do this.\n    ',
		'analysisStep': [
			{
				'file': 'file:///Users/assafa/Documents/code/flask-webgoat/flask_webgoat/auth.py',
				'row': 9,
				'colum': 16
			},
			{
				'file': 'file:///Users/assafa/Documents/code/flask-webgoat/flask_webgoat/auth.py',
				'row': 9,
				'colum': 5
			},
			{
				'file': 'file:///Users/assafa/Documents/code/flask-webgoat/flask_webgoat/auth.py',
				'row': 20,
				'colum': 11
			},
			{
				'file': 'file:///Users/assafa/Documents/code/flask-webgoat/flask_webgoat/auth.py',
				'row': 19,
				'colum': 9
			},
			{
				'file': 'file:///Users/assafa/Documents/code/flask-webgoat/flask_webgoat/auth.py',
				'row': 18,
				'colum': 5
			},
			{
				'file': 'file:///Users/assafa/Documents/code/flask-webgoat/flask_webgoat/auth.py',
				'row': 22,
				'colum': 14
			},
			{
				'file': 'file:///Users/assafa/Documents/code/flask-webgoat/flask_webgoat/__init__.py',
				'row': 14,
				'colum': 15
			}
		]
	} as IEosPage)

	const [pageType, setPageType] = useState(PageType.Eos as PageType)
	let page = <>Nothing to show</>
	if (pageType === PageType.Empty) {
		return page
	}

	switch (pageType) {
		case PageType.Eos:
			page = <Eos data={dependencyData}/>
			break
	}

	return (
		<div className={css.App}>
			<div className={css['App-body']}>{page}</div>
		</div>
	)
}


export default App