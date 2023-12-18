import TimelineContent from '@mui/lab/TimelineContent'
import { IAnalysisStep } from '../../../model'
import css from './AnalysisStepsListElement.module.css'
import { ReactComponent as AttackerEntry } from '../../../assets/icons/attacker_entry.svg'
import { ReactComponent as ExploitExecution } from '../../../assets/icons/exploit_execution.svg'

const FILE_NAME_TRIM_LENGTH = 20

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
		<TimelineContent className={css.timelineContent}>
			<div className={css.rowContainer}>
				<span className={css.row}>
					{item.fileName && hideOverflowText(item.fileName, FILE_NAME_TRIM_LENGTH)} ({item.startRow}
					):
				</span>
				<span className={css.snippet}>{item.snippet}</span>
				<span className={css.badge}>
					{isFirstStep && <AttackerEntry />}
					{isLastStep && <ExploitExecution />}
				</span>
			</div>
		</TimelineContent>
	)
}
