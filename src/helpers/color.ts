export const DARK = '#000'
export const WHITE = '#fff'
export const logWarnings = true
export const CONTRAST_TRESHOLD = 5

export function decomposeColor(color: string): {type: string, values: number[]} {
    if (color.charAt(0) === '#') {
      return decomposeColor(convertHexToRGB(color))
    }
    const logWarnings = true
    const marker = color.indexOf('(')
    const type = color.substring(0, marker)
    const strValues = color.substring(marker + 1, color.length - 1).split(',')
    const values = strValues.map(value => parseFloat(value))
  
    if (logWarnings) {
      if (['rgb', 'rgba', 'hsl', 'hsla'].indexOf(type) === -1) {
        throw new Error(
          [
            `Material-UI: unsupported \`${color}\` color.`,
            'We support the following formats: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla().',
          ].join('\n'),
        )
      }
    }
    return { type, values }
  }
  
  export function convertHexToRGB(color: string) {
    color = color.substr(1)
  
    const re = new RegExp(`.{1,${color.length / 3}}`, 'g')
    let colors = color.match(re)
  
    if (colors && colors[0].length === 1) {
      colors = colors.map(n => n + n)
    }
  
    return colors ? `rgb(${colors.map(n => parseInt(n, 16)).join(', ')})` : ''
  }
  
  export function getLuminance(color: string) {
    logWarnings && console.warn(color, `Material-UI: missing color argument in getLuminance(${color}).`)
  
    const decomposedColor = decomposeColor(color)
  
    if (decomposedColor.type.indexOf('rgb') !== -1) {
      const rgb = decomposedColor.values.map((val: number) => {
        val /= 255 // normalized
        return val <= 0.03928 ? val / 12.92 : ((val + 0.055) / 1.055) ** 2.4
      })
      // Truncate at 3 digits
      return Number((0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]).toFixed(3))
    }
  
    // else if (decomposedColor.type.indexOf('hsl') !== -1)
    return decomposedColor.values[2] / 100
  }
  
  export function getContrastRatio(foreground: string, background: string) {
    if(logWarnings) {
      console.warn(
        foreground,
        `Material-UI: missing foreground argument in getContrastRatio(${foreground}, ${background}).`,
      )
      console.warn(
        background,
        `Material-UI: missing background argument in getContrastRatio(${foreground}, ${background}).`,
      )
    }
  
    const lumA = getLuminance(foreground)
    const lumB = getLuminance(background)
    return (Math.max(lumA, lumB) + 0.05) / (Math.min(lumA, lumB) + 0.05)
  }
  
  export function getContrastText(
    background: string,
    contrastThreshold = CONTRAST_TRESHOLD,
    warnings = true
  ) {
  
    logWarnings && warnings &&  console.warn(
      background,
      `Material-UI: missing background argument in getContrastText(${background}).`,
    )
  
    const contrastText =
      getContrastRatio(background, DARK) >= contrastThreshold
        ? DARK
        : WHITE
  
    if (logWarnings) {
      const contrast = getContrastRatio(background, contrastText)
      console.warn(
        contrast >= contrastThreshold,
        [
          `Material-UI: the contrast ratio of ${contrast}:1 for ${contrastText} on ${background}`,
          'falls below the WACG recommended absolute minimum contrast ratio of 3:1.',
          'https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast',
        ].join('\n'),
      )
    }
  
    return contrastText
}
  
// https://awik.io/determine-color-bright-dark-using-javascript/
export function isLightColor(color:any) {

    // Variables for red, green, blue values
    let r, g, b, hsp
    
    // Check the format of the color, HEX or RGB?
    if (color.match(/^rgb/)) {

        // If HEX --> store the red, green, blue values in separate variables
        color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/)
        
        r = color[1]
        g = color[2]
        b = color[3]
    } 
    else {
        
        // If RGB --> Convert it to HEX: http://gist.github.com/983661
        color = +("0x" + color.slice(1).replace( 
        color.length < 5 && /./g, '$&$&'))

        r = color >> 16
        // eslint-disable-next-line no-mixed-operators
        g = color >> 8 & 255
        b = color & 255
    }
    
    // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
    hsp = Math.sqrt(
    0.299 * (r * r) +
    0.587 * (g * g) +
    0.114 * (b * b)
    )

    // Using the HSP value, determine whether the color is light or dark
    return (hsp>127.5) ? true : false
}
// https://css-tricks.com/snippets/javascript/lighten-darken-color/

export function lightenOrDarkenColor(col:string, amount: number) {
  
    let usePound:boolean = false
    // above -ve is used to darken which is not very intuitive - so we flip
    const amt = amount * -1
    if (col[0] === "#") {
        col = col.slice(1)
        usePound = true
    }
 
    let num = parseInt(col,16)
 
    let r = (num >> 16) + amt
 
    if (r > 255) r = 255
    else if  (r < 0) r = 0
 
    let b = ((num >> 8) & 0x00FF) + amt
 
    if (b > 255) b = 255
    else if  (b < 0) b = 0
 
    let g = (num & 0x0000FF) + amt
 
    if (g > 255) g = 255
    else if (g < 0) g = 0
 
    return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16)
}