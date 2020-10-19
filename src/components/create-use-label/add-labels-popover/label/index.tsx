import React, { useState } from 'react'
import { Typography } from '@material-ui/core'
import OpacityIcon from '@material-ui/icons/Opacity'
import DeleteIcon from '@material-ui/icons/Delete';
import useStyles from '../styles'
import { IconButton } from '@material-ui/core';

export default function Label({
  id,
  className,
  name,
  addNewLevel,
  popupState,
  onClick,
  editInput,
  editLabel,
  setEditInput,
  editColor,
  deleteLabel,
  bg,
  ...rest
}: any) {

  const classes = useStyles()
  const [input, setinput] = useState(name)
  const [showIcon, setShowIcon] = useState(false)

  return (
    <div className={className} onClick={onClick && !addNewLevel && onClick} {...rest}>
      <div
        onClick={() => editColor(id)}
        className={`${classes.left} h-full absolute left-0 top-0 bottom-0 flex items-center justify-center transition-all duration-500`}
        style={{
          backgroundColor: bg,
          width: addNewLevel ? '20%' : '100%',
        }}
      >
        {addNewLevel && <OpacityIcon className={`${classes.opacityIcon} cursor-pointer`} />}
      </div>
      {!editInput ? (
          <Typography className={`  ${classes.labelText}`}>{name}</Typography>
      ) : (
        <input
          type="text"
          onChange={e => {
            setinput(e.target.value)
            editLabel(e.target.value, id)
          }}
          value={input}
          className={`${classes.input} text-gray-500  bg-transparent outline-none pl-8`}
        />
      )}
      { addNewLevel && <IconButton onClick={() => deleteLabel && deleteLabel(id)} className={`${classes.deleteButton} pl-4 p-2`}>
          <DeleteIcon style={{fontSize: '16px'}} />
        </IconButton>
      }
    </div>
  )
}
