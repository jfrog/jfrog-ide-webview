import { IAnalysisStep } from '../../../model/analysisStep'
import css from './EosListElement.module.css'
import CodeBlock from '../CodeBlock/CodeBlock'

/**
 * API exposed to webviews. * * @template StateType Type of the persisted state stored for the webview.
 */export interface WebviewApi<StateType> {
	/**
	 * Post a message to the owner of the webview. * * @param message Data to post. Must be JSON serializable.
	 */ postMessage(message: unknown): void;

	/**
	 * Get the persistent state stored for this webview. * * @return The current state or `undefined` if no state has been set.
	 */ getState(): StateType | undefined;

	/**
	 * Set the persistent state stored for this webview. * * @param newState New persisted state. This must be a JSON serializable object. Can be retrieved
	 * using {@link getState}.
	 * * @return The new state.
	 */ setState<T extends StateType | undefined>(newState: T): T;
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

const EosListElement = (props: Props) => {
	 const vsCodeApi = useMemo(() => acquireVsCodeApi(), [])
	const clickOutside = (event: React.MouseEvent<HTMLButtonElement>, item: any) => {
		console.log(item)
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

export default EosListElement