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
import { ButtonBase } from '@mui/material'
import { ReactComponent as ExpandSvg } from '../../../assets/icons/expand.svg'
import { ReactComponent as MinimizeSvg } from '../../../assets/icons/minimize.svg'
import { TimelineContentLogic } from './TimelineContent'

export interface Props {
	items: IAnalysisStep[]
}

const Connector = (): JSX.Element => <TimelineConnector className={css.connector} />

export default function AnalysisStepsListElement(props: Props): JSX.Element {
	const [expanded, setExpanded] = React.useState(props.items.length < 5)
	const ctx = useContext(eventManagerContext)

	const onClick = (event: React.MouseEvent<HTMLButtonElement>, item: IAnalysisStep): void => {
		event.preventDefault()
		ctx.jumpToCode(item)
	}

	const timelineDotClasses = (i: number): string => {
		const classNames = [css.timelineDot]

		if (i === 0 || i === props.items.length - 1) {
			classNames.push(css.timelineDotBlue)

			if (i === 0) {
				classNames.push(css.timelineDotFirst)
			}
		}

		return classNames.join(" ")
	}

	const ExpandedTimeline = (): JSX.Element => (
		<>
			{props.items.map((item, i) => (
				<ButtonBase
					key={i}
					className={css.button}
					onClick={(event): void => {
						onClick(event, item)
					}}
				>
					<TimelineItem className={css.timeline}>
						<TimelineSeparator>
							{i !== 0 && <Connector />}
							<TimelineDot className={timelineDotClasses(i)}>
								<span>{i + 1}</span>
							</TimelineDot>
							{/* when there are 2 items don't add the bottom connector*/}
							{(props.items.length > 2 || i != 1) && <Connector />}
						</TimelineSeparator>
						<TimelineContentLogic item={item} totalItems={props.items.length} index={i} />
					</TimelineItem>
				</ButtonBase>
			))}
			{props.items.length > 2 && (
				<ButtonBase className={css.button}>
					<TimelineItem
						className={css.timeline}
						onClick={(): void => {
							setExpanded(false)
						}}
					>
						<TimelineSeparator>
							<Connector />
							<TimelineDot
								className={`${timelineDotClasses(1)} ${css.timelineDotExpandMinimizeButton}`}
							>
								<MinimizeSvg />
							</TimelineDot>
						</TimelineSeparator>
						<TimelineContent className={css.timelineContent}>
							<div className={css.flexCenter}>
								<span className={css.showMoreLabel}>Show less</span>
							</div>
						</TimelineContent>
					</TimelineItem>
				</ButtonBase>
			)}
		</>
	)

	const MinimizedTimeline = (): JSX.Element => (
		<>
			<ButtonBase
				className={css.button}
				onClick={(event): void => {
					onClick(event, props.items[0])
				}}
			>
				<TimelineItem className={css.timeline}>
					<TimelineSeparator>
						<TimelineDot className={timelineDotClasses(0)}>
							<span>{1}</span>
						</TimelineDot>
						<Connector />
					</TimelineSeparator>
					<TimelineContentLogic item={props.items[0]} totalItems={props.items.length} index={0} />
				</TimelineItem>
			</ButtonBase>
			<ButtonBase className={css.button}>
				<TimelineItem
					className={css.timeline}
					onClick={(): void => {
						setExpanded(true)
					}}
				>
					<TimelineSeparator>
						<Connector />
						<TimelineDot
							className={`${timelineDotClasses(1)} ${css.timelineDotExpandMinimizeButton}`}
						>
							<ExpandSvg />
						</TimelineDot>
						<Connector />
					</TimelineSeparator>
					<TimelineContent className={css.timelineContent}>
						<div className={css.flexCenter}>
							<span className={css.showMoreLabel}>Show All Steps</span>
						</div>
					</TimelineContent>
				</TimelineItem>
			</ButtonBase>
			<ButtonBase
				className={css.button}
				onClick={(event): void => {
					onClick(event, props.items[props.items.length - 1])
				}}
			>
				<TimelineItem className={css.timeline}>
					<TimelineSeparator>
						<Connector />
						<TimelineDot className={timelineDotClasses(props.items.length - 1)}>
							<span>{props.items.length}</span>
						</TimelineDot>
					</TimelineSeparator>
					<TimelineContentLogic
						item={props.items[props.items.length - 1]}
						totalItems={props.items.length}
						index={props.items.length - 1}
					/>
				</TimelineItem>
			</ButtonBase>
		</>
	)
	return (
		<Timeline className={css.analysisStepsListElement}>
			{expanded ? <ExpandedTimeline /> : <MinimizedTimeline />}
		</Timeline>
	)
}
