import { IAnalysisStep } from '../../../model/analysisStep'
import css from './AnalysisStepsListElement.module.css'
import CodeBlock from '../CodeBlock/CodeBlock'

/**
 * API exposed to webviews. * * @template StateType Type of the persisted state stored for the webview.
 */export interface WebviewApi<StateType> {
	/**
	 * Post a message to the owner of the webview. * * @param message Data to post. Must be JSON serializable.
	 */ postMessage(message: unknown): void;
}

declare global {
	/**
	 * Acquire an instance of the webview API. * * This may only be called once in a webview's context. Attempting to call `acquireVsCodeApi` after it has already * been called will throw an exception. * * @template StateType Type of the persisted state stored for the webview.
	 */ function acquireVsCodeApi<StateType = unknown>(): WebviewApi<StateType>;
}

import { useMemo } from 'react'

interface Props {
	items: IAnalysisStep[]
}

const AnalysisStepsListElement = (props: Props) => {
	 const vsCodeApi = useMemo(() => acquireVsCodeApi(), [])
	const clickOutside = (event: React.MouseEvent<HTMLButtonElement>, item: IAnalysisStep) => {
		event.preventDefault()
		vsCodeApi.postMessage({ 'command': 'reverse_click', fileName: item.file, line: item.row })
	}
	 return (
		 <>
			 {props.items.map((item, i) => (
				 <button onClick={event => clickOutside(event, item)} key={i} className={css.container}>
					 <div className={css.file}>
						 <div className={css.number}>
							 {i + 1}
						 </div>
						 <div className={css.row}> {item.fileName} {item.row}: </div>
						 { item.snippet
							 && 	<CodeBlock codeString={item.snippet} id={i.toString()}/>}

					 </div>
				 </button>))}
		 </>
	 )
}

export default AnalysisStepsListElement