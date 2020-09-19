import React from 'react'
import parse from 'autosuggest-highlight/parse'
import throttle from 'lodash/throttle'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import getGmapsEndpoint from 'endpoints/gmaps'
import mocksEnabled from 'endpoints/mocksEnabled'
import './styles.scss'

function loadScript(src: string, position: HTMLElement | null, id: string) {
  if (!position) {
    return
  }
  const script = document.createElement('script')
  script.setAttribute('async', '')
  script.setAttribute('id', id)
  script.src = src
  position.appendChild(script)
}

const autocompleteService = { current: null }

const useStyles = makeStyles((theme: any) => ({
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
  input: {
    '& input': {
      fontSize: (theme && theme.fontSize ) ? theme.fontSize.md : '1rem'
    }
  }
}))

interface PlaceType {
  description: string
  structured_formatting: {
    main_text: string
    secondary_text: string
    main_text_matched_substrings: [
      {
        offset: number
        length: number
      },
    ]
  }
}

export interface EditorProps {
  /** Google Maps Place Name */
  placeName: string

  /** Signals if Place can be changed or not */
  editable?: boolean

  /** Updates row data in parent component with the purpose of persisting when switching table page */
  updateCell: (placeId: string) => void

  /** ClickAwayListener prop */
  setShowEditor?: (content:any) => void
}

export default function Address({ placeName, editable = true, updateCell, setShowEditor } : EditorProps) {
  const classes = useStyles()
  const [inputValue, setInputValue] = React.useState(placeName || 'Select Location')
  const [options, setOptions] = React.useState<PlaceType[]>([])
  const [selected, setSelected] = React.useState('')
  const [inputContainer, setInputContainer] = React.useState<HTMLElement | null>(null)
  const loaded = React.useRef(false)
  if (typeof window !== 'undefined' && !loaded.current) {
    if (!document.querySelector('#google-maps')) {
      loadScript(
        getGmapsEndpoint(inputValue),
        document.querySelector('head'),
        'google-maps',
      )
    }
    loaded.current = true
  }

  /* Method that gets the name of the new selected place and calls updateRow passed function */
  const handleNewSelectedPlace = (newSelectedVal: string) => {
    if(newSelectedVal !== selected) {
      const place = options.find((option: any) => option.description === newSelectedVal)
        // @ts-ignore
      if(place && place.description) { // backend data POST/PUT request should start inside this conditional
        setSelected(newSelectedVal)
        // @ts-ignore
        updateCell(place.description)
      }
    }
  }

  /* Method that obtains the name of the new selected place when user clicks item in list */
  const handleItemClick = (ev: any) => {
    const selectedItem = JSON.stringify(ev.target.parentElement.innerText).replace(/\\n\\n/g, ', ')
    handleNewSelectedPlace(selectedItem.replace(/"/g,''))
  }


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const fetch = React.useMemo(
    () =>
      throttle((request: { input: string }, callback: (results?: PlaceType[]) => void) => {
        (autocompleteService.current as any).getPlacePredictions(request, callback)
      }, 200),
    [],
  )

  React.useEffect(() => {
    let active = true

    if (!autocompleteService.current && (window as any).google) {
      autocompleteService.current = new (window as any).google.maps.places.AutocompleteService()
    }
    if (!autocompleteService.current) {
      return undefined
    }

    if (inputValue === '') {
      setOptions([])
      return undefined
    }

    !mocksEnabled() ?
      fetch({ input: inputValue }, (results?: PlaceType[]) => {
        if (active) {
          setOptions(results || [])
        }
      })
      :
      import("mocks/gmaps").then(gmapsmock => {
        // @ts-ignore
        setOptions([...gmapsmock.places])
      })

    return () => {
      active = false
    }
  }, [inputValue, fetch])

  // Sets focus on input so user can start typing when component mounts
  if(inputValue === placeName && inputContainer !== null) {
    // @ts-ignore
    inputContainer.children[0].children[0].focus()
  }

  return (
    <div className="table-address" data-test="table-address">
      <ClickAwayListener onClickAway={()=> setShowEditor && setShowEditor(null)}>
          <Autocomplete
            id="table-address-autocomplete" // Required for snapshot testing
            open={true}
            getOptionLabel={(option) => (typeof option === 'string' ? option : option.description)}
            filterOptions={(x) => x}
            options={options}
            autoComplete
            includeInputInList
            disabled={!editable}
            // @ts-ignore
            defaultValue={inputValue}
            disableCloseOnSelect={true}
            renderInput={(params) => (
                <TextField
                {...params}
                ref={(inputContainer: HTMLElement | null) => setInputContainer(inputContainer)}
                label=""
                variant="outlined"
                fullWidth
                onChange={handleChange}
                className={classes.input}
                />)
            }
            renderOption={(option) => {
                const matches = option.structured_formatting.main_text_matched_substrings
                const parts = parse(
                option.structured_formatting.main_text,
                matches.map((match: any) => [match.offset, match.offset + match.length]),
                )
                return (
                <Grid container alignItems="center" onMouseUp={(ev) => handleItemClick(ev)}>
                    <Grid item>
                    <LocationOnIcon className={classes.icon} />
                    </Grid>
                    <Grid item xs>
                      {parts.map((part, index) => (
                        <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                        {part.text}
                        </span>
                    ))}
                    <Typography variant="body2" color="textSecondary">
                        {option.structured_formatting.secondary_text}
                    </Typography>
                    </Grid>
                </Grid>
                )
            }}
          />
      </ClickAwayListener>
    </div>
  )
}