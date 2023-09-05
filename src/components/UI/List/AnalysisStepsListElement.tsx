import { IAnalysisStep } from '../../../model'
import css from './AnalysisStepsListElement.module.css'
import React, { useContext } from 'react'
import { eventManagerContext } from '../../../store/eventContext'
import Timeline from '@mui/lab/Timeline'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineDot from '@mui/lab/TimelineDot'
import { COLORS } from '../../../styles'
import { ButtonBase, Chip } from '@mui/material'
import { ReactComponent as ExpandSvg } from '../../../assets/icons/expand.svg'
import { ReactComponent as MinimizeSvg } from '../../../assets/icons/minimize.svg'
import { SxProps } from '@mui/system'

export interface Props {
	items: IAnalysisStep[]
}

const Connector = (): JSX.Element => (
	<TimelineConnector
		style={{
			maxHeight: '20px'
		}}
	/>
)
export const LABELS = {
	EXPLOIT_EXECUTOIN: 'Exploit execution',
	ATTACKER_ENTRY: 'Attackers entry'
}
const timelineContentStyle = { display: 'flex', alignItems: 'center', gap: 6 }
const SNIPPET_TRIM_LENGTH = 40
const FILE_NAME_TRIM_LENGTH = 10

interface TimelineContentLogicProps {
	item: IAnalysisStep
	totalItems: number
	index: number
	minimized?: boolean
}

const chipStyle = { marginLeft: 'auto', backgroundColor: '#E93838' }

const TimelineContentLogic = ({
	item,
	totalItems,
	index,
	minimized = false
}: TimelineContentLogicProps): JSX.Element => {
	const hideOverflowText = (text: string, max: number): string => {
		if (text.length > max) {
			return `${text.substring(0, max)}...`
		}

		return text
	}

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
				{index === 0 && <Chip style={chipStyle} color="error" label={LABELS.ATTACKER_ENTRY} />}
				{index === totalItems - 1 && (
					<Chip style={chipStyle} color="error" label={LABELS.EXPLOIT_EXECUTOIN} />
				)}
			</div>
		</TimelineContent>
	)
}

export default function AnalysisStepsListElement(props: Props): JSX.Element {
	const [showMore, setShowMore] = React.useState(props.items.length < 5)
	const ctx = useContext(eventManagerContext)

	const onClick = (event: React.MouseEvent<HTMLButtonElement>, item: IAnalysisStep): void => {
		event.preventDefault()
		ctx.jumpToCode(item)
	}

	const buttonStyle = {
		display: 'flex',
		'&:hover': {
			cursor: 'pointer',
			backgroundColor: COLORS.GRAY_600
		},
		'&:before': {
			maxWidth: 0
		}
	}
	const timelineStyle = {
		flex: 1,
		'&:hover': {
			cursor: 'pointer',
			backgroundColor: COLORS.GRAY_600
		},
		'&:before': {
			maxWidth: 0
		}
	}
	const timelineDotStyle = (i: number): SxProps => ({
		display: 'flex',
		width: 20,
		height: 20,
		margin: 0,
		fontSize: 12,
		alignItems: 'center',
		justifyContent: 'center',
		color: COLORS.WHITE_100,
		backgroundColor: COLORS.GRAY_500,
		marginTop: i === 0 ? '19px' : '0px',
		marginBottom: 0,
		cursor: 'pointer',
		boxShadow: 'none'
	})

	return (
		<Timeline style={{ display: 'flex', justifyContent: 'left', padding: 0 }}>
			{showMore ? (
				<>
					{props.items.map((item, i) => (
						<ButtonBase
							key={i}
							sx={buttonStyle}
							onClick={(event): void => {
								onClick(event, item)
							}}
						>
							<TimelineItem sx={timelineStyle}>
								<TimelineSeparator>
									{i !== 0 && <Connector />}
									<TimelineDot sx={timelineDotStyle(i)}>
										<span>{i + 1}</span>
									</TimelineDot>
									<Connector />
								</TimelineSeparator>
								<TimelineContentLogic
									item={item}
									totalItems={props.items.length}
									index={i}
									minimized
								/>
							</TimelineItem>
						</ButtonBase>
					))}
					<ButtonBase sx={buttonStyle}>
						<TimelineItem
							sx={timelineStyle}
							onClick={(): void => {
								setShowMore(false)
							}}
						>
							<TimelineSeparator>
								<Connector />
								<TimelineDot
									sx={{
										...timelineDotStyle(1),
										color: COLORS.WHITE_100,
										backgroundColor: COLORS.GRAY_100
									}}
								>
									<MinimizeSvg />
								</TimelineDot>
							</TimelineSeparator>
							<TimelineContent style={timelineContentStyle}>
								<div className={css.flexCenter}>
									<span className={css.showMoreLabel}>Show less</span>
								</div>
							</TimelineContent>
						</TimelineItem>
					</ButtonBase>
				</>
			) : (
				<>
					<ButtonBase
						sx={buttonStyle}
						onClick={(event): void => {
							onClick(event, props.items[0])
						}}
					>
						<TimelineItem sx={timelineStyle}>
							<TimelineSeparator>
								<TimelineDot sx={timelineDotStyle(0)}>
									<span>{1}</span>
								</TimelineDot>
								<Connector />
							</TimelineSeparator>
							<TimelineContentLogic
								item={props.items[0]}
								totalItems={props.items.length}
								index={0}
								minimized={false}
							/>
						</TimelineItem>
					</ButtonBase>
					<ButtonBase sx={buttonStyle}>
						<TimelineItem
							sx={timelineStyle}
							onClick={(): void => {
								setShowMore(true)
							}}
						>
							<TimelineSeparator>
								<Connector />
								<TimelineDot
									sx={{
										...timelineDotStyle(1),
										color: COLORS.WHITE_100,
										backgroundColor: COLORS.GRAY_100
									}}
								>
									<ExpandSvg />
								</TimelineDot>
								<Connector />
							</TimelineSeparator>
							<TimelineContent style={timelineContentStyle}>
								<div className={css.flexCenter}>
									<span className={css.showMoreLabel}>Show All Steps</span>
								</div>
							</TimelineContent>
						</TimelineItem>
					</ButtonBase>
					<ButtonBase
						sx={buttonStyle}
						onClick={(event): void => {
							onClick(event, props.items[props.items.length - 1])
						}}
					>
						<TimelineItem sx={timelineStyle}>
							<TimelineSeparator>
								<Connector />
								<TimelineDot sx={timelineDotStyle(props.items.length - 1)}>
									<span>{props.items.length}</span>
								</TimelineDot>
							</TimelineSeparator>
							<TimelineContentLogic
								item={props.items[props.items.length - 1]}
								totalItems={props.items.length}
								index={props.items.length - 1}
								minimized={false}
							/>
						</TimelineItem>
					</ButtonBase>
				</>
			)}
		</Timeline>
	)
}
