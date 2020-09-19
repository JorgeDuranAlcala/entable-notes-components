import { sortRows, getSorting } from './table'
import { unit } from 'theme'
export { sortRows, getSorting }
export function getWidth(width:number) {
    return `${width}${unit}`
}

export function roundNum(num: number, decimal: number = 2) {
    return Math.round(num * Math.pow(10, decimal))/ (Math.pow(10, decimal))
}

export function roundFrac(value: number, step:number|null=0.5) {
    if (step === null) {
        step = 1
    }
    const inv = 1.0 / step;
    return Math.round(value * inv) / inv;
}