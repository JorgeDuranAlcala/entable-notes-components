import React from 'react'
import clsx from 'clsx'

import { WithStyles, withStyles, Theme} from '@material-ui/core/styles'
import { OverridableComponent } from '@material-ui/core/OverridableComponent'
import { SvgIconTypeMap } from '@material-ui/core/SvgIcon'

import Avatar from 'components/avatar'
import { Shape, Size, IAvatar} from '../avatar'

const styles = (_theme: Theme):any => ({
    /* Styles applied to the root element. */
    root: {
      display: 'flex',
    },
    /* Styles applied to the avatar elements. */
    avatar: {
      marginLeft: -8,
    },
});

const SPACINGS = {
    sm: -16,
    md: -12,
    separate: 4,
    together: -8,
  };

export interface StyleProps  extends WithStyles<typeof styles> { 
}

export interface AvatarGroupProps extends StyleProps  {
    children?: React.ReactNode
  /**
   * Max avatars to show before +x.
   */
    avatars: IAvatar[]
    Icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> | null
    max?: number
    border?: boolean
    shape?: Shape
    size?: Size
    style?: object
  /**
   * Spacing between avatars.
   */
    spacing?: 'sm' | 'md' | 'together' | 'separate' | number
    className?: string
    classes: any
    handleClick?: (e:any) => void
}

function AvatarGroup(props: AvatarGroupProps) {
    const {
      children: childrenProp,
      classes,
      className,
      avatars,
      size,
      shape,
      border,
      spacing = 'md',
      max = 5,
      handleClick,
      Icon,
      ...other
    } = props;
    const extraAvatars = avatars.length > max ? avatars.length - max : 0;

    // @ts-ignore
    const marginLeft = spacing && SPACINGS[spacing] !== undefined ? SPACINGS[spacing] : -spacing
    return (
      <div className={clsx(classes.root, className)}  {...other} data-test="table-avatargroup">
        {avatars.slice(0, avatars.length - extraAvatars).map((child:any, index) =>(
            <Avatar
                key={index}
                src={child.src}    
                name={child.name}
                size={size}
                border={border}
                style= {{
                    zIndex: avatars.length - index,
                    marginLeft
                }}
            />)
        )}
        {extraAvatars ? (
            <Avatar
                className={classes.avatar}
                style={{
                    zIndex: 0,
                    marginLeft,
                }}
                size={size}
                extra
                name={`+${extraAvatars}`}
                border={border}
            />
        ) : null}
        {Icon ? (
          <Avatar
            className={classes.avatar}
            style={{
                zIndex: 1,
                marginLeft: '0.05rem',
            }}
            size={size}
            Icon={Icon}
            border={border}
            handleClick={(e)=> handleClick && handleClick(e)}
      />
        ): null}
      </div>
    )
  }

  export default withStyles(styles)(AvatarGroup)
