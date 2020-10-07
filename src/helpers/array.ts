/**
 * validator
 *
 * @param {Array} arr - array to validate
 * @param {number} from - targeted index
 * @param {number} to - targeted index
 * @returns
 */
// https://github.com/jalal246/move-position

export type FromTo = {
  from: number
  to: number
}

export function isNotInRange(arr:any, { from, to }: FromTo = {from:0,to:0}) {
  const { length } = arr

  return (
    !Array.isArray(arr) ||
    typeof from !== "number" ||
    typeof to !== "number" ||
    from < -1 ||
    to < -1 ||
    to > length ||
    from > length
  )
}
/*
export function isValid(arr:any[], form2Obj:any) {
  return !isNotInRange.call(this, arr, form2Obj)
}
*/
/**
 * Moves element form/to index.
 *
 * @param {Array} [arr=[]]
 * @param {number} from
 * @param {number} to
 * @param {boolean} [isMutate=true]
 * @returns {Array}
 */
export function move(arr:any[] = [], from:number, to:number=0, isMutate:boolean = true, el:any=null) {
  if (isNotInRange(arr, { from, to })) return arr
  
  const modified = isMutate ? arr : arr.slice()
  if (!el) {
    el = modified.splice(from, 1)[0]
  }
  modified.splice(to, 0, el)
  return modified
}

/**
 * Moves the same index in multiple arrays
 *
 * @param {Array} [arr=[]] Array contain arrays to be changed
 * @param {number} from - targeted index
 * @param {number} to - targeted index
 * @param {boolean} [isMutate=true]
 * @returns {Array}
 */
export function moveMultiArr(multiArr:any[][] = [[]], from:number, to:number, isMutate:boolean=true) {
  return multiArr.map((arr) => move(arr, from, to, isMutate))
}

/**
 * Moves multiple indexes in the same array.
 *
 * @param {Array} [arr=[]]
 * @param {{ from, to }[]} movingMap
 * @returns {Array} new Array with index changes
 */
export function moveMultiIndex(arr:any[][] = [[]], movingMap:FromTo[]=[]) {
  const modified = arr.slice()

  movingMap.forEach(({ from, to }:FromTo) => {
    modified[to] = arr[from]
  })
  return modified
}

export function compose(...fns: any) {
  return (arg:any) => fns.reduce((acc:any, fn:any) => fn(acc), arg)
}

export function partialRight(fn:any, ...args:any[]) {
  return (...leftArgs:any) => fn(...leftArgs, ...args)
}

export function addInArrayAtPosition(array:any[], element:any, position:number) {
  const arrayCopy = [...array]
  arrayCopy.splice(position, 0, element)
  return arrayCopy
}

export function removeFromArrayAtPosition(array:any[], position: number) {
  return array.reduce((acc, value, idx) => (idx === position ? acc : [...acc, value]), [])
}

export function changeElementOfPositionInArray(array:any[], from:number, to:number) {
  const removeFromArrayAtPositionFrom = partialRight(removeFromArrayAtPosition, from)
  const addInArrayAtPositionTo = partialRight(addInArrayAtPosition, array[from], to)

  return compose(removeFromArrayAtPositionFrom, addInArrayAtPositionTo)(array)
}

export function replaceElementOfArray(array: any[]) {
  return function (options:any) {
    return array.map((element) => (options.when(element) ? options.for(element) : element))
  }
}

export function pickPropOut(object:any, prop:any) {
  return Object.keys(object).reduce((obj, key) => {
    return key === prop ? obj : { ...obj, [key]: object[key] }
  }, {})
}