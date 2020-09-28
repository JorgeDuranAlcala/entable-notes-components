import React, { useState } from 'react'
import { Typography } from '@material-ui/core';
import OpacityIcon from '@material-ui/icons/Opacity';
import useStyles from "../styles";

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
    bg,
    ...rest
  }: any) {
    const classes = useStyles();
    const [input, setinput] = useState(name)
    return (
      <div className={className} onDoubleClick={onClick&& onClick}  {...rest}>
          <div
            onClick={() => editColor(id)}
            className={`${classes.left} h-full absolute left-0 top-0 bottom-0 flex items-center justify-center transition-all duration-500`}
            style={{
              backgroundColor: bg,
              width: addNewLevel ? '20%' : '100%',
            }}
          >
          { addNewLevel && <OpacityIcon className={classes.opacityIcon} />}
          </div>
          {
               !editInput  ?  (
                  <Typography className={`pl-2  ${classes.labelText}`}>
                    {name}
                  </Typography>
                  )
                : ( <input
                  type="text"
                  onChange={(e) => {
                    setinput(e.target.value)
                    editLabel(e.target.value, id)
                  }}
                  value={input}
                  className={`${classes.input} text-gray-500  bg-transparent outline-none pl-6`}
                />
                )
            }
      </div>
    );
  }