import React, { ReactElement, useState } from 'react'
import { Button, makeStyles, Popover, Theme, Typography } from '@material-ui/core'
import board from "mocks/board.json";
import { blue, grey, purple, yellow } from '@material-ui/core/colors';

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
        <Typography>{ !addNewLevel && name}</Typography>
    </div>
}

function Color({ color, onClick }: any) {
    return <div 
            className="rounded-full p-4 cursor-pointer mr-2" 
            onClick={() => onClick&&onClick(color)} 
            style={{backgroundColor: color}}>
            </div>
} 


function AddLabelsPopover(props:any): ReactElement {

    const classes = useStyles()
    const [labels, setLabels] = useState(board.labels)
    const [input, setInput] = useState<string>('Add label')
    const [addNewLevel, setAddNewLabel] = useState<boolean>(false)
    const [activeInput, setActiveInput] = useState<boolean>(false)
    const [colorSelected, setColorSelected] = useState<string>('')


    const handleSubmit = (e?: React.FormEvent<HTMLFontElement>) => {
        e && e.preventDefault();

        let newLabel = {
            id: (Number(labels.slice(-1)[0].id) + 1).toString(),
            name: input,
            class: '',
            bg: colorSelected ? colorSelected : grey[200],
            color: '#000'
        }

        setLabels([...labels, newLabel])
    }

    const handleColor = (color: string) => {
        setColorSelected(color)
        /* alert(`This is your color broh >>> ${colorSelected}`) */
    }

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

              { activeInput && addNewLevel && 
                ( <div className="flex" style={{ backgroundColor: grey[200]}} >
                        <div 
                            className="flex p-4"
                            style={{ 
                                backgroundColor: colorSelected ? colorSelected : grey[200], 
                                width: addNewLevel ? '20%': '100%',
                                transition: 'width ease .5s'
                            }} >
                                <form onSubmit={e => handleSubmit(e)}>
                                    <input 
                                        type="text" 
                                        className={classes.input} 
                                        value={input}
                                        onChange={e => setInput(e.target.value)}  />
                                    <button type="submit" hidden></button>
                                </form>
                            </div>
            
                    </div>
                )
            }
               { addNewLevel && <div 
                    className="p-4 cursor-pointer" 
                    style={{ 
                        backgroundColor: 'transparent', 
                        border: `2px dashed ${grey[300]}` 
                        }} 
                    onClick={() => setActiveInput(!activeInput)}>
                        New Label
                </div>}
            </div>
            {/* A panel where you can choose a color for new label */}
            { addNewLevel && <div className="color-to-choose flex p-4">
                        <Color color={blue[200]} onClick={(color: string) => handleColor(color)} />
                        <Color color={yellow[700]} onClick={(color: string) => handleColor(color)} />
                        <Color color={purple[500]} onClick={(color: string) => handleColor(color)} />
                </div>
            }
            <div className={`${classes.popover_footer} flex`} >
                <Button 
                    fullWidth 
                    className={`${classes.btn} p-4`} 
                    onClick={() => addNewLevel 
                                ? handleSubmit() 
                                : setAddNewLabel(!addNewLevel)
                            }
                    >
                    {
                        !addNewLevel 
                            ? "Add/edit label"
                            : "Apply"
                    }
                </Button>
            </div>
        </div>
    </Popover>
    )
}

export default AddLabelsPopover
