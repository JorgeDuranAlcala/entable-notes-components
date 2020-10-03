import React, { ReactNode } from 'react'
import Tooltip from '@material-ui/core/Tooltip'

interface IProps {
  title: string
  content: string[]
  children: React.ReactElement
}

function TooltipList(props: IProps) {
  const { children: child, title, content } = props
  return (
    <Tooltip
      title={
        <div style={{ fontSize: 16 }}>
          <p style={{ marginBottom: 5 }}>
            <strong>Users</strong>
          </p>
          {content.map(item => (
            <p style={{ marginBottom: 5 }}>{item}</p>
          ))}
        </div>
      }
      placement="top"
    >
      {child}
    </Tooltip>
  )
}

export default TooltipList
