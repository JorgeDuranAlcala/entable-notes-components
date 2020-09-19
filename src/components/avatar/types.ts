export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type Shape = 'square' | 'circle' | 'square'

export interface IAvatar {
  src?: string
  name?: string
  handleClick?: (e:any) => void
}