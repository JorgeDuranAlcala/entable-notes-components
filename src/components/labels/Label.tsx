import React from "react";
import Button from "@material-ui/core/Button";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
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
export interface LabelProps {
  bgColor?: string;
  color?: string;
  value: string;
  li?: boolean;
  onClick?: (e: any) => void;
  deletable?: boolean;
  new?: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    li: {
      fontSize: "1rem",
      padding: "1rem",
      margin: "2px",
      width: "7rem",
      height: "2rem",
    }
  })
);

export default function Label(props: LabelProps) {
  const { bgColor, li, color, value, onClick } = props;
  const classes = useStyles();
  const cls = clsx(classes.li, "cursor", "inline-flex", "items-center", "justify-center")
  return li ? (
    <li
      style={{ backgroundColor: bgColor, color }}
      className={cls}
      onClick={(e: any) => onClick && onClick(e)}
    >
      {value}
    </li>
  ) : (
    <div
      style={{ backgroundColor: bgColor, color }}
      className={cls}
      onClick={(e: any) => onClick && onClick(e)}
    >
      {value}
    </div>
  );
}

Label.defaultProps = {
  bgColor: grey[300],
  color: "#000"
};