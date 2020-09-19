import { ThemeZoom }     from 'theme'
import { Buffer, FontSize } from 'types'
import  defaults, { Settings } from '../settings'
import { Cell, CellValue, Column } from 'apps/table/types'

const FULL_SCREEN = 'full_screen'
const THEME_ZOOM = 'theme_zoom'
const SETTINGS = 'settings'
const CURRENT_BUFFER = 'buffer'
const BUFFERS = 'buffers'
class LocalStorageMock {
    store:any={}
    constructor() {
      this.store = {};
    }
  
    clear() {
      this.store = {};
    }
  
    getItem(key:string) {
      return this.store[key] || null;
    }
  
    setItem(key:string, value:string) {
      this.store[key] = value.toString();
    }
  
    removeItem(key:string) {
      delete this.store[key];
    }
  };
  if (!global.localStorage) {
      // @ts-ignore
      global.localStorage = new LocalStorageMock()
  }
interface IGlobalContext {
    buffers: Buffer[]
    nextDomainId: number
    nextProjectId: number
    nextBoardId: number
    nextLaneId: number
    settings: Settings
    fullScreen: boolean
    palette?: any
    themeZoom: ThemeZoom,
    fontSize: FontSize,
    setThemeZoom: (themeZoom: ThemeZoom) => void
    setSettings : (settings: Settings) => void
    setFullScreen: (isFullScreen: boolean) => void
    focusedCell?: Cell | null
    currentBuffer?: Buffer
    domainId?: number
    projectId?: number
    boardId?: number
    laneBy?: number
    laneId?: string
    rows: any[]
    columns: Column[]
    anchorEl?: any
    setCurrentBuffer: (buffers: Buffer) => void
    setBuffers: (buffers: Buffer[]) => void
    setDomainId:(domainId: number) => void
    setProjectId:(projectId: number) => void
    setBoardId:(boardId: number) => void
    setLaneId:(laneId: string) => void
    setLaneBy:(labeBy: number) => void
    setRows: (rows:any[]) => void
    setColumns: (columns: Column[]) => void
    getColumn: (idx: number) => Column
    updateCell: (cell: Cell, newVal: CellValue) => void
    setFocusedCell:  (cell: Cell|null) =>void
    setAnchorEl: (el:any) => void
    theme: any
    setTheme: (theme:any)  => void
    /*

    setDomainId: (domainId: number) => void
    setProjectId: (projectId: number) => void
    setBoardId: (boardId: number) => void
    setLaneBy?: (laneBy?: string) => void // split by/ group by colId
    setLaneId: (laneId: string) => void // example  laneby status, laneId = 'FINISHED, 'INPROGRESS' etc 
    setRowIndex: (idx: number) => void
    setColIndex: (idx: number) => void
    setRowId: (id: string) => void
    setColId: (id: string) => void
    setRange: (range: number[]) => void
    */
}

const fullScreen = !!(localStorage && localStorage.getItem(FULL_SCREEN))
const tZoom = localStorage && localStorage.getItem(THEME_ZOOM)
const themeZoom:ThemeZoom = tZoom ? JSON.parse(tZoom) as ThemeZoom : { zoom: 1, theme: 'material'}
const defaultS = localStorage && localStorage.getItem(SETTINGS)
const defaultSettings: Settings = defaultS ? JSON.parse(defaultS) : defaults
let lBuffer = localStorage && localStorage.getItem(CURRENT_BUFFER)
const currentBuffer:Buffer = lBuffer ? JSON.parse(lBuffer) : []
lBuffer = localStorage && localStorage.getItem(BUFFERS)
const buffers:Buffer[] = lBuffer ? JSON.parse(lBuffer) : []

export const GlobalContext: IGlobalContext = {
    buffers,
    currentBuffer,
    nextDomainId: 2,
    nextProjectId: 2,
    nextBoardId: 2,
    nextLaneId: 2,
    fullScreen,
    themeZoom,
    settings: defaultSettings,
    theme: null,
    fontSize: {
        xs: '0.5rem',
        sm: '0.75rem',
        md: '1rem',
        lg: '1.25rem',
        xl: '1.5rem'
    },
    columns: [],
    rows: [],
    setFocusedCell: (cell: Cell|null)  => {
        GlobalContext.focusedCell = cell;
    },
    setThemeZoom: (themeZoom:ThemeZoom) => {
        (async() => localStorage && localStorage.setItem(THEME_ZOOM, 
            JSON.stringify(themeZoom)))()
        GlobalContext.themeZoom = themeZoom
    },
    setSettings: (settings: Settings) => {
        (async() => localStorage  && localStorage.setItem(SETTINGS, 
            JSON.stringify(settings)))()
        GlobalContext.settings = settings
    },
    setCurrentBuffer: (buffer: Buffer) => {
        (async() => localStorage  && localStorage.setItem(CURRENT_BUFFER, 
            JSON.stringify(buffer)))()
        GlobalContext.currentBuffer = buffer
    },
    setBuffers: (buffers: Buffer[]) => {
        (async() => localStorage  && localStorage.setItem(BUFFERS, 
            JSON.stringify(buffers)))()
        GlobalContext.buffers = buffers
    },
    setFullScreen: (screen: boolean) => {
        (async() => localStorage  && localStorage.setItem(FULL_SCREEN, screen.toString()))()
        GlobalContext.fullScreen = screen
    },
    setDomainId: (domainId: number) => {
        GlobalContext.domainId = domainId
    },
    setProjectId: (projectId: number) => {
        GlobalContext.projectId = projectId
    },
    setBoardId: (boardId: number) => {
        GlobalContext.boardId = boardId
    },
    setLaneId:(laneId: string) => {
        GlobalContext.laneId = laneId
    },
    setLaneBy:(laneBy: number) => {
        GlobalContext.laneBy = laneBy
    },
    setRows: (rows: any[]) => {
        GlobalContext.rows = rows
    },
    setColumns: (columns: Column[]) => {
        GlobalContext.columns = columns
    },
    getColumn: (idx:number) => GlobalContext.columns[idx],
    updateCell: (cell: Cell, newVal: CellValue) => {
        const { rowIndex, colIndex } = cell
        GlobalContext.rows[rowIndex][colIndex] = newVal
    },
    setAnchorEl: (el:any) => {
        GlobalContext.anchorEl = el
    },
    setTheme: (theme: any) => {
        GlobalContext.theme = theme
    }
}

export default GlobalContext