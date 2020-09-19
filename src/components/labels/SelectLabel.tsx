import React, { useState } from "react";

import Popover from '@material-ui/core/Popover'
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles"
import Input from "@material-ui/core/Input"
import clsx from "clsx"
import { GlobalContext } from 'context'
import TextField from "@material-ui/core/TextField"
import Label from "./Label"
import Button from "@material-ui/core/Button"
import {  paletteColors } from "theme/palette"

import {
  grey,
  red,
  blue,
  teal,
  pink,
  lightBlue,
  yellow,
  orange,
  green
} from "@material-ui/core/colors";
export interface SelectLabelProps {
  cls?: string;
  css?: object;
  options?: any;
  value: string;
  onChange?: (e: any) => void;
  onUpdateOptions?: (options: any) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    ul: {
      maxHeight: "20rem",
      maxWidth: "23rem",
      width: "auto",
      alignItems: 'center',
      padding: "1rem"
    }
  })
);
const palette = "default";
const def = "OK";
const options = {
  OK: {
    bgColor: 0,
    count: 1
  },
  InProgress: {
    bgColor: 0,
    count: 2
  }
};
export default function SelectLabel(props: SelectLabelProps) {
  const { options, value, onChange, onUpdateOptions } = props;
  const classes = useStyles();
  if (!options.palette) {
    options.palette = palette;
  }
  if (!options.default) {
    options.default = def;
  }
  if (!options.options) {
    options.options = options;
  }

  const handleClose = () => GlobalContext.setAnchorEl(null)
  
  const id = 'set-label'
  // @ts-ignore
  const colorPalette = paletteColors[options.palette] ? paletteColors[options.palette] : paletteColors.default
  const keys = Object.keys(options.options);
  const [filterOptions, setFilterOptions] = useState([...keys]);
  const [editLabels, setEditLabels] = useState(false);
  const [newLabel, setNewLabel] = useState("");
  const [errorInNewLabel, setErrorInNewLabel] = useState("")
  const select = (val: string) => {
    const options = keys.filter(key =>
      key.toLowerCase().indexOf(val.toLowerCase())
    );
    setFilterOptions(options);
  };
  const renderFilterOptions = filterOptions.map(option => {
    const opt = options.options[option]
    let bgColor = opt ? opt.bgColor : 0
    if (Number.isInteger(bgColor) && bgColor < colorPalette.length) {
      bgColor = colorPalette[bgColor]
    } else {
      if (bgColor[0]  !== '#') {
        bgColor  = colorPalette[0]
      }
    }
    return (
      <Label
        value={option}
        li={true}
        onClick={e => {
          e.stopPropagation()
          onChange && onChange(option)
        }}
        bgColor={bgColor}
      />
    );
  });
  if (editLabels) {
    renderFilterOptions.push(<Label value="" li={true} new={true} />);
  }
  const cls = clsx(classes.ul, "list-none", "flex", "flex-wrap");
  const filters = <ul className={cls}>{renderFilterOptions}</ul>;
  return (
    <Popover 
      open={true}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      id={id}
      anchorEl={GlobalContext.anchorEl}
      onClose={handleClose}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}>
      <div style={{height:'auto'}}>
        <div className="flex flex-col">
          {filters}
          {!editLabels && (
            <Button onClick={() => setEditLabels(true)} variant="outlined">
              Manage Labels
            </Button>
          )}
          {editLabels && (
            <>
              <Input
                onChange={e => setNewLabel(e.target.value)}
                placeholder="New label name"
              />
              <Button
                onClick={e => {
                  console.log(options);
                  console.log(newLabel);
                  if (newLabel.trim() === "") {
                    console.log("Empty");
                    setErrorInNewLabel("The label is empty");
                  } else if (options.options[newLabel]) {
                    setErrorInNewLabel("The label alredy exists");
                  } else {
                    options.options[newLabel] = {
                      bgColor: Math.floor(Math.random() * 8)
                    };
                    setNewLabel("");
                    setEditLabels(false);
                    setFilterOptions(Object.keys(options.options));
                  }
                }}
              >
                Add
              </Button>
            </>
          )}
          {errorInNewLabel !== "" && <p>{errorInNewLabel}</p>}
        </div>
      </div>
    </Popover>
  );
}

SelectLabel.defaultProps = {
  options: {
    default: def,
    palette,
    options
  }
};
