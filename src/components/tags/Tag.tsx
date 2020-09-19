import React from 'react'
import Box from '@material-ui/core/Box'

export interface TagProps {
    bgColor?: string
    cls?: string
    css?: object
    children: React.ReactNode
    onClick?: (e:any) => void
}

export default function Tag(props:  TagProps) {
    const { bgColor, cls, css, children, onClick } = props
    return (
        <Box pl={0.85} pr={0.85} pt={0.25}
            data-test="table-tag"
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            pb={0.65} mr={0.5} mb={0.5} borderRadius="42px/42px"
            bgcolor={bgColor}
            className={cls?cls:undefined}
            css={css ? css : undefined}
            onClick={(e:any) => onClick && onClick(e)}
            >
            {children}
        </Box>
    )
}

Tag.defaultProps = {
    bgColor : "grey.300",
    css: {}
}