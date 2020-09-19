import React from 'react'
import { withStyles, Theme, makeStyles } from '@material-ui/core/styles'
import MuiTooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'

const HtmlTooltip = withStyles((theme: Theme) => ({
    tooltip: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
    },
}))(MuiTooltip)
  
export interface ITooltip
{
    name?: string
    title: string,
    content?: string[],
    children: React.ReactElement
}

export default function Tooltip(props: ITooltip) {
    // @ts-ignore
    return (<HtmlTooltip
        title={
            <React.Fragment>
                <Typography color="inherit">{props.name}</Typography>
                <em>{"And here's"}</em> <b>{'some'}</b> <u>{'amazing content'}</u>.{' '}
                {"It's very engaging. Right?"}
            </React.Fragment>
        }
        >
        {props.children}
        </HtmlTooltip>
    )
}