import React from 'react'
import { withStyles, WithStyles } from '@material-ui/core'
import styles from "./styles";
import { IColor } from 'helpers/color';

interface IProps extends WithStyles<typeof styles> {
    bg?: string;
    color?: IColor;
    handleClick?: (e: any, color: IColor, colorSelected?: string) => void;
}

const ColorToChoose = (props:IProps) => {
    const { classes, color, bg, handleClick, ...rest } = props;

    return <div 
                className={`${classes.root} cursor-pointer inline-block`} 
                style={{ background: bg }} 
                onClick={ (e:any) => handleClick && color && handleClick(e, color, bg) }
                { ...rest }
            >
        </div>
}

export default withStyles(styles)(ColorToChoose)




