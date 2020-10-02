export type Settings = {
    country: string,
    ui: {
        sideMenuWidth: string,
        miniMenuWidth: string,
        rightDrawerWidth: string,
        headerHeight: string,
        header2Height: string,
        filterWidth: string,
    }
}

const defaults:Settings = {
    country: 'US',
    ui: {
        sideMenuWidth: '400px',
        miniMenuWidth: '6px',
        rightDrawerWidth: '600px',
        headerHeight: '64px',
        header2Height: '100px',
        filterWidth: '150px'
    }
}

export const RESIZE_DEBOUNCE_TIME = 500
export default defaults