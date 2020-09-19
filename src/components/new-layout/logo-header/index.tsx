import React, { ReactElement } from 'react'
import MenuIcon from '@material-ui/icons/Menu'
import useStyles from './styles'
import useLayoutStyles from '../styles'

interface Props {
    logoContent?: any
    onToggle?: (e: any) => void
    collapsed?: boolean
}

function LogoHeader({ logoContent, collapsed, onToggle }: Props): ReactElement {
    const classes = useStyles()
    const layoutClasses = useLayoutStyles()
    const logo = collapsed
                ? null
                : logoContent && typeof (logoContent) === 'string' ? 
                    <h4 className={`${classes.title} ml-1`}>Entable</h4>
                : logoContent
    let cls = `${classes.logo}  ${classes.brandWrapper} ${layoutClasses.logo} font-bold p-2 flex items-center transition-all duration-300 tracking-widest`
    cls += logo ? ' justify-between' : ' justify-center'
    
    return (
        <div className={cls} >
            {logo && logo}
            <MenuIcon
                className={`${classes.icon} cursor-pointer`}
                onClick={onToggle}
            />
        </div>
    )
}

export default LogoHeader
