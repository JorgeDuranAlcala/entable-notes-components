import React, { ReactElement, useRef } from "react"
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state"
import AddLabelsPopover from "./add-labels-popover"

type Label = {
      id: string
      bg: string
      color: string
      name: string
}

interface Props {
  labels: Label[]
}

function CreateUseLabel({ labels }: Props): ReactElement {
  const ref = useRef<HTMLDivElement | null>(null)

  return (
    <PopupState variant="popover" popupId="add-new-labels">
      {(popupState: any) => (
        <div className="grid grid-cols-5">
          <div className="people">
            <h3>People</h3>
          </div>
          <div className="priority">
            <h3>Priority</h3>
            <div
              className="cursor-pointer p-4"
              style={{ backgroundColor: labels[0].bg }}
              ref={ref}
              {...bindTrigger(popupState)}
            >
              {labels[0].name}
            </div>
          </div>
          <AddLabelsPopover
            popupState={popupState}
            labelref={ref}
            {...bindPopover(popupState)}
          />
        </div>
      )}
    </PopupState>
  )
}

export default CreateUseLabel