import React, { useState } from 'react'
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import css from './Collapse.module.css'
import { ReactComponent as ChevronSvg } from '../../../assets/icons/chevron_green.svg'
import { COLORS } from '../../../styles'

export interface Props {
	header: React.ReactNode
	children: React.ReactNode
	expanded?: boolean
}

export function Collapse(props: Props): JSX.Element {
	const [opened, setOpened] = useState(props.expanded ?? false)
	const accordionStyle: React.CSSProperties = {
		background: COLORS.DARK_GRAY,
		color: COLORS.WHITE_100,
		boxShadow: 'none',
		borderRadius: '6px',
		width: '100%',
		minWidth: '420px'
	}
	return (
		<Accordion
			onChange={(): void => {
				setOpened(!opened)
			}}
			expanded={opened}
			sx={accordionStyle}
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
			<AccordionDetails sx={{ padding: '0 16px 16px 16px' }}>{props.children}</AccordionDetails>
		</Accordion>
	)
}
