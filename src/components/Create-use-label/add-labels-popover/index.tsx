import React, { ReactElement, Ref, useState } from "react";
import {
  Button,
  makeStyles,
  Popover,
  Theme,
  Typography,
  useTheme,
} from "@material-ui/core";
import PencilIcon from "@material-ui/icons/Edit"
import board from "mocks/board.json";
import { blue, green, grey, purple, red, yellow } from "@material-ui/core/colors";
import useStyles from "./styles";
import { bindToggle } from "material-ui-popup-state";

interface Props {}

function Label({ className, name, addNewLevel, popupState, onClick, bg, ...rest }: any) {
  const classes = useStyles();
  return (
    <div className={className} onClick={onClick && onClick} {...rest}>
      <div
        className={`${classes.left} flex absolute origin-left transition-transform duration-500`}
        style={{
          backgroundColor: bg,
          transform: addNewLevel ? "scaleX(20)" : "scaleX(120)",
        }}
      ></div>
      <Typography className={`pl-2 ${classes.labelText}`}>{name}</Typography>
    </div>
  );
}

function Color({ color, onClick, className }: any) {
  return (
    <div
      className={`${className} hover:scale-125 hover:shadow-md transition-all rounded-full p-4 cursor-pointer mr-2`}
      onClick={() => onClick && onClick(color)}
      style={{ backgroundColor: color }}
    ></div>
  );
}

function AddLabelsPopover(props: any): ReactElement {
  const classes = useStyles();
  const theme = useTheme()
  const [labels, setLabels] = useState(board.labels);
  const [input, setInput] = useState<string>("Add label");
  const [addNewLabel, setAddNewLabel] = useState<boolean>(false);
  const [activeInput, setActiveInput] = useState<boolean>(false);
  const [colorSelected, setColorSelected] = useState<string>("");
  const [colors, setColors] = useState<string[]>([blue[500], red[300], green[500], purple[400], yellow[300] ]);

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    e && e.preventDefault();

    let newLabel = {
      id: (Number(labels.slice(-1)[0].id) + 1).toString(),
      name: input,
      class: "",
      bg: colorSelected ? colorSelected : grey[200],
      color: theme.palette.text.primary,
    };

    setLabels([...labels, newLabel]);
    setAddNewLabel(!addNewLabel);
  };

  const handleColor = (color: string) => {
    setColorSelected(color);
    /* alert(`This is your color broh >>> ${colorSelected}`) */
  };

  const selectLabel = (bg: string, name: string) => {
    const { current } = props.labelref;
    current.innerText = name;
    current.style.backgroundColor = bg;
    props.popupState.close()
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
              key={label.id}
              name={label.name}
              popupState={props.popupState}
              className={`p-4 flex items-center cursor-pointer relative ${classes.label}`}
              onClick={() => selectLabel(label.bg, label.name)}
              bg={label.bg}
              addNewLevel={addNewLabel}
            />
          ))}

          {activeInput && addNewLabel && (
            <div className="flex items-center relative" style={{ backgroundColor: grey[200] }}>
              <div
                className={`${classes.left} flex absolute origin-left transition-transform duration-500`}
                style={{
                  backgroundColor: colorSelected ? colorSelected : grey[400],
                  transform: addNewLabel ? "scaleX(20)" : "scaleX(120)",
                }}
              ></div>
              <input type="text" onChange={e => setInput(e.target.value)} className={`${classes.input} pl-6`} value={input} />
            </div>
          )}
          {addNewLabel && (
            <div
              className="p-4 cursor-pointer"
              style={{
                backgroundColor: "transparent",
                border: `2px dashed ${grey[300]}`,
              }}
              onClick={() => setActiveInput(!activeInput)}
            >
              <Typography>New Label</Typography>
            </div>
          )}
        </div>
        {/* A panel where you can choose a color for new label */}
        {addNewLabel && (
          <div className="color-to-choose flex p-4">
              { colors.map(color => (
                   <Color
                    color={color}
                    className={classes.color}
                    onClick={(color: string) => handleColor(color)}
                    />
              )) }
          </div>
        )}
        <div className={`${classes.popover_footer} flex`}>
          <Button
            fullWidth
            className={`${classes.btn} p-4`}
            onClick={() =>
              addNewLabel ? handleSubmit() : setAddNewLabel(!addNewLabel)
            }
          >
            <Typography className="bold flex items-center">
                { !addNewLabel && <PencilIcon/> }
                {!addNewLabel ? "Add/edit label" : "Apply"}
            </Typography>
          </Button>
        </div>
      </div>
    </Popover>
  );
}

export default AddLabelsPopover;
