import React from 'react'
import { Card, CardHeader, Divider, CardContent, IconButton } from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'

interface WidgetProps {
  children: React.ReactNode
  title: string
}
export default function Widget(props: WidgetProps) {
  const { children, title } = props
  return (
    <Card elevation={0}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={title}
      />
      <Divider light />
      <CardContent>{children}</CardContent>
      <Divider light />
    </Card>
  )
}
