import React, { forwardRef} from "react"

export interface FlexProps {
  /**
   * Shorthand for `alignItems` style prop
   */
  inline?: boolean

  center?: boolean
  align?: 'start' | 'end' | 'center' | 'baseline' | 'stretch'
  /**
   * Shorthand for `justifyContent` style prop
   */
  justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly'
  /**
   * Shorthand for `flexWrap` style prop
   */
  wrap?: boolean
  /**
   * Shorthand for `flexDirection` style prop
   */
  direction?: 'row-reverse' | 'col' | 'col-reverse'
  /**
   * Shorthand for `flexBasis` style prop
   */
  //basis?: boolean
  /**
   * Shorthand for `flexGrow` style prop
   */
  //grow?: boolean
  /**
   * Shorthand for `flexShrink` style prop
   */
  //shrink?: boolean
  component?: 'li' | 'div' | 'span' | 'a' | 'ul'
}
/**
 * React component used to create flexbox layouts.
 *
 * It renders a `div` with `display: flex` and
 * comes with helpful style shorthand.
 *
 */

export const Flex = forwardRef((props: FlexProps, ref:any) => {
  const { inline=false, direction, align, justify, wrap,  center, component="div", ...rest } = props
  let cls = inline ? 'inline-flex okdo ' : 'flex okdo '
  cls+= ' w-full '
  if (direction) {
    cls += `flex-${direction} `
  }
  if (center) {
    cls += 'align-center justify-center'
  }
  else {
    if (align) {
      cls += `align-${align} `
    }
    if (justify) {
      cls += `justify-${align} `
    }
  }
  switch (component) {
    case 'li':
      return <li ref={ref} className={cls} {...rest} />
    case 'ul':
      return <ul ref={ref} className={cls} {...rest} />
    case 'div':
      return <div ref={ref} className={cls} {...rest} />
    case 'span':
      return <span ref={ref} className={cls} {...rest} />
    case 'a':
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      return <a ref={ref} className={cls} {...rest} />
  }
})
