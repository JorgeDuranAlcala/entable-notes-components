// https://medium.com/javascript-in-plain-english/extend-material-ui-theme-in-typescript-a462e207131f
import { AutoCompleteClassKey } from '@material-ui/lab/Autocomplete'
import { Theme, ThemeOptions, Palette, PaletteColorOptions, PaletteOptions } from '@material-ui/core/styles/createMuiTheme';
export type Email = string

export type SocialMediaType = 'LINKEDIN' | 'FACEBOOK' | 'TWITTER' | 'INSTAGRAM' | 'YOUTUBE' | 'MEDIUM'

export type ViewType = 'TABLE' | 'TIMELINE' | 'BOARD' | 'CARD'

export type Person = string[]

export type People = Person[]

export type Status = 'Ready' | 'Pending' | 'Review' | 'Need Change' | 'Archive' | 'Publish' |  'Locked' | 'Frozen'

export type Image = {
    title: string
    src: [{
        color?: string // dominant color
        credit?: string
        urls: [{
            url: URL,
            resolution: string
        }]
    }]
}

export type Blog =  {
    id: string
    metadata: Metadata
    publishedAt: number
    authors: People // different from Metadata for sake of publishing
    credits: Image[]
    title: string
    text: string
}

export type Calendar = [{
    id: string,
    start: number,
    end: number,
    title: string,
    content: string,
    link: URL,
    attendees: People,
    createdBy: Person,
    createdAt: number,
    updatedAt: number,
    version: string
}]

export type MetaData = {
    id: string
    parentId: string
    shortName: string
    name: string
    description: string 
    logo?: Image
    images?: Image[]
    comments?: Comment[]
    permission?: Permission
    createdAt: number
    createdBy: Person
    lastAccessed: number
    lastAccessedBy: Person
    lastUpdated: number
    lastUpdatedBy: Person
    authors: People
    coAuthors: People
    status: Status
    public?: boolean
    accessCount: number // number of people who accessed
    favoriteCount: number
    myFavorite: boolean
    calendar: any
    tags: string[]
    parentId?: string
    version: string
}

export type Timeline = {
    start: number
    end: number
    priority: number // higher = will show , lower on zoom
    title: string
    description: string
    images: Image[]
    createdAt: number
    createdBy: string
    lastUpdated: number
    lastUpdatedBy: string
}

export type TenantStatus = 'PendingVerification' | 'Active' | 'Inactive' | 'SuspendedForPayment' | 'SuspendedForSecurity'
 |  'Deleted'

export enum AllowableUsers {
    Internal = 'Internal',
    AllowExternal = 'AllowExternal',
    Public = 'Public'
}

export type Tenant = {
    id: string
    name: string
    address: string
    country: string
    status: TenantStatus
    domain: URL
    shortName: string
    siteAdmin: People
    users: People
    parentId?: string
    createdAt: number
    updatedAt: number
    lastAccessed: number
    accessOk?: boolean
    userCount: number
    boardCount: number
    space: number
    verificationNeeded?: boolean
    allowableUsers: AllowableUsers
}

export type TenantPaymentAccount = {
    id: string
    tenantId: string
    billingUser: Person
    otherUser: People
    paymentType: 'Card' | 'Paypal'
    tenantRating: number 
}

export type User = {
    id: string
    firstName: string
    lastName: string
    email: Email
    title: string
    avatars?: Image[]
    manager?: User
    groups: Group[]
    socialLinks: SocialLink[]
    links: URL[]
    images: Image[]
    createdAt: number
    createdBy: string
    lastUpdated: number
    lastUpdatedBy: string
    verified?: boolean
}

export type UserAuths = [SocialLink & {
    authToken: any
}]

export type Request = User & {
    social: SocialLink
    requestDate: number
}

export type Member = Request & {
    joinDate: number
    lastAccessed: number
    active: boolean
    addedByUserId: string
}

export type Group = {
    id: string
    name: string
    purpose: string
    members: Member[]
    owners: Member[]
    open: boolean
    public: boolean
    requests: Request[]
}

export type SocialLink = {
    type: SocialMediaType
    url: URL
}

export type Comment = {
    id: string
    createdAt: number
    createdBy: string
    message: string
    markdown: boolean
    parentId: string // parent comment Id
}

export type Permission = {
    owner: People,
    admin?: string[],
    create?: string[],
    update?: string[],
    view?: string[],
    version: string
}

export type Reminders = [{
    id: string,
    dueDate: number,
    version: string,
    parentId: string
}]

export type DataCount = {
    table: number
    notes: number
}

export enum BufferType  {
    ROW,
    COLUMN,
    RANGE,
    CELL,
    PARA
}

export enum BufferOP {
    CUT,
    COPY,
    PASTE
}

export type Buffer = {
    key: string
    type?: BufferType
    op?: BufferOP
    data: any
    date: number
    stale?: boolean
    meta?: any
}

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' 

export type FontSize = {
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
}

declare module '@material-ui/core/styles/createPalette' {
    interface PaletteOptions {    
        accent: PaletteColorOptions
        contrastText: string
        custom: {
            contrastText: string
            primary: string,
            secondary: string
        }
    }
    interface Palette {
        accent: PaletteColor
        contrastText: string
        custom: {
            contrastText: string
            primary: string,
            secondary: string
        }
    }
}

declare module '@material-ui/core/styles/createMUITheme' {
    interface ThemeOptions {
        zoomFontSize: (factor: number) => string
        zoomSpacing: (factor: number) => number
        fontSize: FontSize
        lineHeight: FontSize
        palette: PaletteOptions
    }
    interface Theme {
        zoomFontSize: (factor:number) => string
        zoomSpacing: (factor: number) => number
        fontSize: FontSize
        lineHeight: FontSize
        palette: PaletteColor
    }
}

declare module '@material-ui/core/styles/overrides' {
    interface ComponentNameToClassKey {
        MuiAutocomplete: AutoCompleteClassKey
    }
}