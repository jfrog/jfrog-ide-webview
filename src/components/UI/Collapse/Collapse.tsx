import React, { useState } from 'react'
import { Accordion, accordionClasses, AccordionDetails, AccordionSummary } from '@mui/material'
import css from './Collapse.module.css'
import chevronSvg from '../../../assets/icons/chevron_green.svg'
import { COLORS } from '../../../styles'

export interface Props {
	header?: React.ReactNode
	content?: React.ReactNode
}

export function Collapse(props: Props): JSX.Element {
	return (
		<Accordion
			sx={{
				background: COLORS.DARK_GRAY,
				color: COLORS.WHITE_100,
				boxShadow: 'none',
				width: '100%'
			}}
		>
			<AccordionSummary
				expandIcon={
					<div className={css.expandIcon}>
						<img src={chevronSvg} />
					</div>
				}
			>
				{props.header}
			</AccordionSummary>
			<AccordionDetails sx={{ padding: '0 16px 16px 16px' }}>{props.content}</AccordionDetails>
		</Accordion>
	)
}
