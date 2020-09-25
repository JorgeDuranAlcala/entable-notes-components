import React, { ReactElement, useState, useRef } from 'react'
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

    const ref = useRef<HTMLDivElement | null>(null)

    return (
        <div className="grid grid-cols-5">
            <div className="people">
                <h3>People</h3>
            </div>
            <div className="priority">
                <h3>Priority</h3>
                <div
                    className="cursor-pointer"
                    style={{backgroundColor: labels[0].bg}} 
                    ref={ref}
                    {...bindTrigger(popupState)}
                >{labels[0].name}</div>
            </div>
            <AddLabelsPopover labelref={ref} {...bindPopover(popupState)} />
        </div>
    )
}

export default CreateUseLabel
