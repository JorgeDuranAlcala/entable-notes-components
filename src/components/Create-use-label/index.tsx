import React, { ReactElement, useState } from 'react'
import { 
    usePopupState,
    bindTrigger,
    bindPopover
 } from "material-ui-popup-state/hooks";
import { Popover, Typography } from '@material-ui/core';
import AddLabelsPopover from './add-labels-popover';

type Label = { id: string, bg: string, color: string, name: string }

interface Props {
    labels: Label[]
}

function CreateUseLabel({ labels }: Props): ReactElement {
    
    const popupState = usePopupState({
        variant: 'popover',
        popupId: 'add-new-labels'
    })

    return (
        <div className="grid grid-cols-5">
            <div className="people">
                people
            </div>
            <div className="priority">
                {
                    labels.map(label => ( 
                        <div 
                        className="cursor-pointer" 
                        style={{backgroundColor: label.bg}}
                        {...bindTrigger(popupState)}
                         >{label.name}</div> 
                    ))
                }
            </div>
            <div className="status">
                {
                    labels.filter(l => Number(l.id) % 2 === 0).map(label => ( 
                            <div 
                            className="cursor-pointer" 
                            style={{backgroundColor: label.bg}} 
                            {...bindTrigger(popupState)}
                            >{label.name}</div> 
                        ))
                }
            </div>
            <AddLabelsPopover {...bindPopover(popupState)} />
        </div>
    )
}

export default CreateUseLabel
