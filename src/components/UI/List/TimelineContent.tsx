import TimelineContent from '@mui/lab/TimelineContent'
import { IAnalysisStep } from '../../../model'
import { LABELS } from './AnalysisStepsListElement'
import { Chip } from '@mui/material'
import css from './AnalysisStepsListElement.module.css'

const SNIPPET_TRIM_LENGTH = 40
const FILE_NAME_TRIM_LENGTH = 16
export const timelineContentStyle = { display: 'flex', alignItems: 'center', gap: 6 }
interface TimelineContentLogicProps {
	item: IAnalysisStep
	totalItems: number
	index: number
}

const chipStyle = {
	marginLeft: 'auto',
	backgroundColor: ' rgba(233,56,56,0.2)',
	border: '1px solid rgb(233, 56, 56)',
	fontFamily: 'Overpass Mono'
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
				{isFirstStep && <Chip style={chipStyle} color="error" label={LABELS.ATTACKER_ENTRY} />}
				{isLastStep && <Chip style={chipStyle} color="error" label={LABELS.EXPLOIT_EXECUTION} />}
			</div>
		</TimelineContent>
	)
}
