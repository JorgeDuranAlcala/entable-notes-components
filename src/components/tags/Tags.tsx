import React from 'react'
import Box from '@material-ui/core/Box'
import Tag from './Tag'
export interface TagProps {
    tags: string[]
    cls?: string
    css?: object
    color?: 'primary' | 'secondary' | 'accent' | 'error' | 'info' | 'warning' | 'danger' | 'error'
    bgColor?: string
    tagCls?: string
    tagCss?: object
    onClick?: (e:any) => void
}

export default function Tags(props:  TagProps) {
    const { bgColor, cls, css, onClick, tags, tagCls, tagCss } = props
    
    return(
        <Box
            data-test="table-tags"
            justifyContent="flex-start"
            className={cls?cls:undefined}
            onClick={(e:any) => onClick && onClick(e)}
            css={css ? css : undefined} >
                {tags.map(((tag, idx) => (
                    <Tag
                        key={idx}
                        cls={tagCls} 
                        css={tagCss} 
                        bgColor={bgColor}>
                        {tag}
                    </Tag>
                )))}
           
        </Box>
    )
}


Tags.defaultProps = {
    bgColor : "grey.300"
}