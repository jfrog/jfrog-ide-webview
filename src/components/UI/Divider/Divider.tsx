import { Divider as MuiDivider } from "@mui/material"

export default function Divider(): JSX.Element {
    const dividerStyle = {
        width: '100%',
        backgroundColor: '#454545'
    }
    return (<MuiDivider sx={dividerStyle} />)
}