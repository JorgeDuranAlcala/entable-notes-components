import React, { ReactElement, useState, useRef } from "react";
import { Button, Popover, Typography, useTheme } from "@material-ui/core";
import PencilIcon from "@material-ui/icons/Edit";
import board from "mocks/board.json";
import {
  blue,
  green,
  grey,
  purple,
  red,
  yellow,
} from "@material-ui/core/colors";
import Label from './Label';
import Color from './Color';

import useStyles from "./styles";

interface Props {}


function AddLabelsPopover(props: any): ReactElement {
  const classes = useStyles();
  const theme = useTheme();
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [labels, setLabels] = useState(board.labels);
  const [input, setInput] = useState<string>("Add label");
  const [addNewLabel, setAddNewLabel] = useState<boolean>(false);
  const [activeInput, setActiveInput] = useState<boolean>(false);
  const [activeEditInput, setActiveEditInput] = useState<boolean>(false);
  const [activeEditColor, setActiveEditColor] = useState<boolean>(false);
  const [colorSelected, setColorSelected] = useState<string>("");
  const [labelId, setLabelId] = useState<string>("");
  const [colorOnMouse, setColorOnMouse] = useState<string>("");
  const [colors, setColors] = useState<string[]>([
    blue[500],
    red[300],
    green[500],
    purple[400],
    yellow[300],
  ]);

  const create_label = () => {
    let newLabel = {
      id: (Number(labels.slice(-1)[0].id) + 1).toString(),
      name: input,
      class: "",
      bg: colorSelected ? colorSelected : grey[200],
      color: theme.palette.text.primary,
    };

    setInput("")
    setColorSelected("")

    if(labels.find(label => label.name === newLabel.name)) { 
      setLabels([...labels]);
    } else {
      setLabels([...labels, newLabel]);
    }
  };
  const edit_label = (value: string, id: string) => {
     let x = labels.map(label => (
        (label.id == id)
          ? {...label, name: value}
          : label
      ))
      setLabels([...x])
  };
  const edit_color = (id: string) => {
    setLabelId(id)
    setActiveEditColor(true)
 };

  const choose_color_edit = (color: string) => {
    let x = labels.map(label => (
      (label.id == labelId)
        ? {...label, bg: color}
        : label
    ))
    setLabels([...x])
    setActiveEditColor(false)
 };

  const handleColor = (color: string) => {
    setColorSelected(color);
    setActiveInput(true);
    inputRef.current?.focus()
  };
  const onApply = () => {
    create_label();
    setActiveInput(false);
    setActiveEditInput(!activeEditInput)
    setAddNewLabel(!addNewLabel);
  };

  const selectLabel = (bg: string, name: string) => {
    const { current } = props.labelref;
    current.innerText = name;
    current.style.backgroundColor = bg;
    props.popupState.close();
  };

  return (
    <Popover
      {...props}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <div className={`${classes.container} flex flex-col`}>
        <div className={`${classes.popover_body} p-4 grid grid-cols-3 gap-5`}>
          {labels.map((label) => (
            <Label
              id={label.id}
              key={label.id}
              name={label.name}
              popupState={props.popupState}
              editInput={activeEditInput}
              setEditInput={setActiveEditInput}
              editLabel={edit_label}
              editColor={edit_color}
              className={`flex items-center justify-center cursor-pointer relative ${classes.label}`}
              onClick={() => selectLabel(label.bg, label.name)}
              bg={label.bg}
              addNewLevel={addNewLabel}
            />
          ))}


          {activeInput && addNewLabel && (
            <div
              className="flex items-center justify-center relative"
              style={{ backgroundColor: grey[200] }}
            >
              <div
                className={`${classes.left} h-full absolute left-0 top-0 bottom-0 flex items-center transition-all duration-500`}
                style={{
                  backgroundColor: colorSelected ? colorSelected : grey[400],
                  width: addNewLabel ? '20%' : '100%',
                }}
              >
              </div>
              <input
                type="text"
                onChange={(e) => setInput(e.target.value)}
                className={`${classes.input} text-gray-500  bg-transparent outline-none pl-6`}
                value={input}
                ref={inputRef}
              />
            </div>
          )}
          {addNewLabel && (
            <div
              className="p-4 cursor-pointer"
              style={{
                backgroundColor: colorOnMouse ? colorOnMouse : "transparent",
                border: `2px dashed ${grey[300]}`,
              }}
              onClick={() => {
                setActiveInput(true);
                inputRef.current?.focus()
                if (activeInput) create_label();
              }}
            >
              <Typography>New Label</Typography>
            </div>
          )}
        </div>
        {/* A panel where you can choose a color for new label */}
        {addNewLabel && (
          <div className="color-to-choose flex p-4">
            {colors.map((color, i) => (
              <Color
                key={i}
                color={color}
                className={classes.color}
                onClick={(color: string) => handleColor(color)}
                setColorOnMouse={setColorOnMouse}
                editColor={activeEditColor}
                chooseColorToEdit={choose_color_edit}
              />
            ))}
          </div>
        )}
        <div className={`${classes.popover_footer} flex`}>
          <Button
            fullWidth
            className={`${classes.btn} p-4`}
            onClick={() => {
              if(addNewLabel) {
                onApply() 
              } else {
                setActiveEditInput(!activeEditInput)
                setAddNewLabel(!addNewLabel)
              }
            }
          }
          >
            <Typography className="bold flex items-center">
              {!addNewLabel && <PencilIcon />}
              {!addNewLabel ? "Add/edit label" : "Apply"}
            </Typography>
          </Button>
        </div>
      </div>
    </Popover>
  );
}

export default AddLabelsPopover;
