import React, { useState } from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import AvatarGroup, { AvatarGroupProps } from '../avatar-group/AvatarGroup'
import Avatar, { IAvatar } from 'components/avatar'
import './style.scss'

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
const checkedIcon = <CheckBoxIcon fontSize="small" />

interface PeopleDropdownSelectTypes {
    /** List of selectable people */
    people: IAvatar[]

    /** AvatarGroup Component Data. "avatars" prop obj array gets rendered as the people selected by default ("preselected") */
    avatarGroupProps: AvatarGroupProps
    setShowEditor?: (content:any) => void
}

export default function PeopleDropdownSelect({ people, avatarGroupProps,  setShowEditor }: PeopleDropdownSelectTypes) {
    const { avatars, max, spacing, shape, size, border, Icon, children } = avatarGroupProps
    const preSelectedPeople = avatars
    const [selectedPeople, setSelectedPeople] = useState(preSelectedPeople)

  const preSelecteds = []
  for(let preSelectedPerson of preSelectedPeople) {
      const index = people.findIndex((person: any) => person.name === preSelectedPerson.name && person.src === preSelectedPerson.src)
      if(index !== -1) preSelecteds.push(people[index])
  }

  return (
    <ClickAwayListener onClickAway={()=> setShowEditor && setShowEditor(null)}>
      <div onClick={(ev) => ev.stopPropagation()} className="table-people" data-test="table-peopledropdownselect">
        <Autocomplete
            multiple
            id="checkboxes-tags-demo"
            open={true}
            options={people}
            disableCloseOnSelect
            defaultValue={preSelecteds}
            getOptionLabel={(option: any) => option.name || ''}
            renderOption={(option, { selected }) => {
            return (
                <>
                    <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        checked={selected}
                    />
                    <Avatar
                        src={option.src}
                        name={option.name}
                        size={size}
                        border
                    />
                    <span       className="table-people-checkbox-name">{option.name || ''}</span>
                </>
            )
        }}
        style={{ width: 250 }}
        onChange={(event, value) => setSelectedPeople(value)}
        renderInput={(params) => (
            <>
                <div className={`selected ${size}`}>
                    <AvatarGroup
                        avatars={selectedPeople}
                        max={max}
                        spacing={4}
                        size={size}
                        shape={shape}
                        Icon={Icon}
                        border={border}
                        children={children}
                        style={{zIndex: 0}}
                    />
                </div>
                <TextField {...params} variant="outlined"></TextField>
            </>
        )}
        />
      </div>
    </ClickAwayListener>
  )
}

