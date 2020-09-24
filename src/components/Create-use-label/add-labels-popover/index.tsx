import React, { ReactElement, useState } from 'react'
import { Button, makeStyles, Popover, Theme, Typography } from '@material-ui/core'
import board from "mocks/board.json";
import { grey } from '@material-ui/core/colors';

interface Props {
    
}


const useStyles = makeStyles((theme: Theme) => ({
    container: {
        minWidth: 450,
        minHeight: 300,
    },
    popover_body: {
        borderBottom: `2px solid ${grey[300]}`,
        flex: 0.8
    },
    popover_footer: {
        flex: 0.2
    },
    btn: {
        
    },
    input: {
        backgroundColor: 'transparent',
        paddingLeft: '2rem',
        flex: 1,
        outline: 'none',
        border: 'none'
    }
}))

function Label({ className, name, addNewLevel , bg, ...rest }:any) {
    return <div 
            className={className} 
            style={{ 
                backgroundColor: bg,
                width: addNewLevel ? '20%': '100%',
                transition: 'width ease .5s'
            }} 
            {...rest}>
        <Typography>{name}</Typography>
    </div>
}

function AddLabelsPopover(props:any): ReactElement {

    const classes = useStyles()
    const [labels, setLabels] = useState(board.labels)
    const [input, setInput] = useState<string>('Add label')
    const [addNewLevel, setAddNewLabel] = useState<boolean>(false)
    const [activeInput, setActiveInput] = useState<boolean>(false)

    return (
        <Popover
            {...props}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center'
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center'
            }}
        >
        <div className={`${classes.container} flex flex-col`}>
            <div className={`${classes.popover_body} p-4 grid grid-cols-3 gap-5`} >
                {
                    labels.map(label => (
                        <Label 
                            name={label.name}
                            className="p-4"
                            bg={label.bg}
                            addNewLevel={addNewLevel}
                        />
                    ))
                }

              { activeInput && <div className="flex" style={{ backgroundColor: grey[200]}} >
                    <div 
                        className="flex p-4"
                        style={{ 
                            backgroundColor: grey[600], 
                            width: addNewLevel ? '20%': '100%',
                            transition: 'width ease .5s'
                        }} >
                            <input 
                                type="text" 
                                className={classes.input} 
                                value={input}
                                onChange={e => setInput(e.target.value)}  />
                        </div>
        
                </div>}
                <div 
                    className="p-4 cursor-pointer" 
                    style={{ 
                        backgroundColor: 'transparent', 
                        border: `2px dashed ${grey[300]}` 
                        }} 
                    onClick={() => setActiveInput(!activeInput)}>
                        New Label
                </div>
            </div>
            <div className={`${classes.popover_footer} flex`} >
                <Button 
                    fullWidth 
                    className={classes.btn} 
                    onClick={() => setAddNewLabel(!addNewLevel)}
                    >
                    Add/edit label
                </Button>
            </div>
        </div>
    </Popover>
    )
}

export default AddLabelsPopover
