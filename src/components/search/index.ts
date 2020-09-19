import Search from './Search'
export interface ISearch {
  placeholder?: string
  handleSearch: (str: string) => void
  toggleSearchMode: () => void
  minChars?: number
  width?: string
  minWidth?: string
}
export default Search
export { Search }

