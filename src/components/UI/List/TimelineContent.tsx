import TimelineContent from '@mui/lab/TimelineContent'
import { IAnalysisStep } from '../../../model'
import css from './AnalysisStepsListElement.module.css'
import { ReactComponent as AttackerEntry } from '../../../assets/icons/attacker_entry.svg'
import { ReactComponent as ExploitExecution } from '../../../assets/icons/exploit_execution.svg'
const SNIPPET_TRIM_LENGTH = 40
const FILE_NAME_TRIM_LENGTH = 12
export const timelineContentStyle = { display: 'flex', alignItems: 'center', gap: 6 }
interface TimelineContentLogicProps {
	item: IAnalysisStep
	totalItems: number
	index: number
}

export const TimelineContentLogic = ({
	item,
	totalItems,
	index
}: TimelineContentLogicProps): JSX.Element => {
	const hideOverflowText = (text: string, max: number): string => {
		if (text.length > max) {
			return `${text.substring(0, max)}...`
		}

		return text
	}

	const isFirstStep = index === 0
	const isLastStep = index === totalItems - 1

	return (
		<TimelineContent style={timelineContentStyle}>
			<div className={css.flexCenter}>
				<span className={css.row}>
					{item.fileName && hideOverflowText(item.fileName, FILE_NAME_TRIM_LENGTH)} ({item.startRow}
					):
				</span>
				<span className={css.snippet}>
					{item.snippet && <div>{hideOverflowText(item.snippet, SNIPPET_TRIM_LENGTH)}</div>}
				</span>
				<span className={css.badge}>
					{isFirstStep && <AttackerEntry />}
					{isLastStep && <ExploitExecution />}
				</span>
			</div>
		</TimelineContent>
	)
}
