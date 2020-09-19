import React from 'react'
// https://github.com/roderickhsiao/react-aspect-ratio/tree/master/src
const CUSTOM_PROPERTY_NAME = '--aspect-ratio'

type Props = {
  ratio: string | number, 
  style: Object,
  children: any
}

const AspectRatio = (props: Props) => {
  const {
    ratio, style, children, ...otherProps
  } = props

  const newStyle = {
    ...style,
    // https://github.com/roderickhsiao/react-aspect-ratio/commit/53ec15858ae186c41e70b8c14cc5a5b6e97cb6e3
    [CUSTOM_PROPERTY_NAME]: `(${ratio})`
  }

  return ( 
    // @ts-ignore
    <div style={newStyle} {...otherProps}>
      {children}
    </div>
  )
}

AspectRatio.defaultProps = {
  className: 'react-aspect-ratio-placeholder',
  ratio: 1
}

export default AspectRatio