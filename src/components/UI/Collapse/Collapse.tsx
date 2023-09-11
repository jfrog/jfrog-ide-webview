import React, { useState } from 'react'
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import { ReactComponent as ChevronSvg } from '../../../assets/icons/chevron_green.svg'
import css from './Collapse.module.css'

export interface Props {
	header: React.ReactNode
	children: React.ReactNode
	expanded?: boolean
}

export function Collapse(props: Props): JSX.Element {
	const [opened, setOpened] = useState(props.expanded ?? false)
	return (
		<Accordion
			onChange={(): void => {
				setOpened(!opened)
			}}
			expanded={opened}
			className={css.accordion}
		>
			<AccordionSummary
				expandIcon={
					<div className={css.expandIcon}>
						<ChevronSvg />
					</div>
				}
			>
				{props.header}
			</AccordionSummary>
			<AccordionDetails className={css.accordionDetails}>{props.children}</AccordionDetails>
		</Accordion>
	)
}
