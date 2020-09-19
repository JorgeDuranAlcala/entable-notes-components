import React from 'react'
import { WithStyles, withStyles, Theme} from '@material-ui/core/styles'
import clsx from 'clsx'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'

import { countryToFlag, countries } from 'helpers/countries'
import { Size } from 'types'
import defaults from 'settings'

import './styles.scss'

const defaultCountryFlag =  countryToFlag(defaults.country)

export interface StyleProps  extends WithStyles<typeof styles> {
   
}

export interface RenderProps extends StyleProps {
    /** Two characters Country Code string */
    country?: string
    /** Font size */
    size?: Size
    handleClick?: (e:any) => void
}

export interface EditorProps extends StyleProps {
    /** Signals if Country can be changed or not */

    /** Two characters Country Code string */
    country?: string

    /** Font size */
    size?: Size

    /** Updates row data in parent component with the purpose of persisting when switching table page */
    updateCell: (newCellValue:any) => void
    setShowEditor: (content:any) => void
}

interface CountryType {
    code: string
    label: string
    phone: string
}

const styles = (theme: Theme):any => {
    const { fontSize } = theme
    return {
        isoRoot: {
            marginTop:'-0.125em',
            marginLeft: '1em',
            fontSize: fontSize.md
        },
        isoVal: {
            marginLeft: '0.25rem'
        },
        input: {
            widht: '100%',
            opacity: 0
        }
    }
}

function CountryCell(props: RenderProps) {
    const { classes, country = defaults.country, size = "md", handleClick} = props
    let countryFlag = countryToFlag(country)
    let countryVal = country
    if (!countryFlag) {
        countryFlag = defaultCountryFlag
        countryVal = defaults.country
    }

    return (
        <span className={clsx(classes.isoRoot, "cursor", "inline-flex", "items-center", "justify-center")} onClick={(e:any) => handleClick && handleClick(e)} data-test="table-country">  
            <span data-test="table-country-flag">{countryFlag}</span>
            <span
                className={clsx(classes.isoVal)}
                data-test="table-country-code"
            >
                {countryVal}
            </span>
        </span>
    )
}

function  Country(props: EditorProps) {
    const { classes, country = defaults.country, size = "md", updateCell, setShowEditor} = props
    const [countryCode, setCountryCode] = React.useState(country)

    let countryFlag = countryToFlag(countryCode)
    let countryVal = countryCode
    if (!countryFlag) {
        countryFlag = defaultCountryFlag
        countryVal = defaults.country
    }

    return (
        <ClickAwayListener onClickAway={()=> {
            setShowEditor(null)
        }}>
        <Autocomplete
            id="country-select-demo"
            style={{ width: 300 }}
            open={true}
            options={countries as CountryType[]}
            classes={{
                option: classes.option,
                input: classes.input
            }}
            autoHighlight
            getOptionLabel={(option) => option.code}
            renderOption={(option) => (
                <React.Fragment>
                    <span data-test="table-country-selectableflags">{countryToFlag(option.code)}</span>
                    {option.label} ({option.code}) +{option.phone}
                </React.Fragment>
            )}
            renderInput={(params) => {
                // @ts-ignore
                const selectedVal: string = params.inputProps.value
                if (selectedVal && selectedVal !== countryCode) {
                    setCountryCode(selectedVal)
                    updateCell && updateCell(selectedVal)
                }

                return (
                    <TextField
                    {...params}
                    label="Choose a country"
                    variant="outlined"
                    inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password', // disable autocomplete and autofill
                    }}
                    />
                )
            }}
        />
        </ClickAwayListener>
    )
}

export default withStyles(styles)(Country)

export const RenderCountry = withStyles(styles)(CountryCell)