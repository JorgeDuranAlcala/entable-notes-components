import React from 'react'
import useStyles from './styles'
import AvatarPie from 'components/avatar-pie/AvatarPie'
import { IAvatar } from 'components/avatar'

interface IProps {
  color: string
  row: number
  startColumn: number
  endColumn: number
  text: string
  users: IAvatar[]
}

export default function (props: IProps) {
  const { color, row, startColumn, endColumn, text } = props
  const clases = useStyles()
  const totalColumns = endColumn - startColumn
  return (
    <div
      style={{
        backgroundColor: color,
        gridRow: row,
        gridColumnStart: startColumn,
        gridColumnEnd: endColumn,
      }}
      className={`${clases.line} ${clases.textContaier}`}
      onMouseEnter={e => {
        console.log(e.pageX)
      }}
    >
      <AvatarPie avatars={props.users} size="md" />
      <div>
        <p>{text}</p>
      </div>
    </div>
  )
}
