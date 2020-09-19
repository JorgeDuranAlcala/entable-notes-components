import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import { fade, WithStyles, withStyles, Theme } from '@material-ui/core/styles'
import { ClickAwayListener, InputAdornment, InputBase, IconButton } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import { useDebounce } from 'use-debounce'
import { ISearch } from './index'
import i18nStrings from 'i18n/strings'

const styles = (theme: Theme): any => {
  return {
    search: {
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      'transition': 'all 0.5s'
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    }
  }
}

export interface StyleProps  extends WithStyles<typeof styles> {
   
}

export interface SearchProps extends StyleProps, ISearch{
}

function Search(props: SearchProps) {
  const {
    placeholder = 'Search...',
    handleSearch,
    toggleSearchMode,
    minChars = 3,
    width = '90%',
    minWidth = '10rem',
    classes
  } = props
  const [searchMode, setSearchMode] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 500)
  debugger
  useEffect(
    () => {
      if (debouncedSearchTerm && (debouncedSearchTerm.length >= minChars)) {
        handleSearch(debouncedSearchTerm[0])
      }
    },
    [debouncedSearchTerm]
  )
  function handleSearchMode() {
    debugger
    setSearchMode(!searchMode)
    toggleSearchMode()
  }
  if (searchMode) {
    debugger
    return (
      <ClickAwayListener  onClickAway={()=> handleSearchMode()}>
  
          <InputBase
            placeholder={placeholder}
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            style={{ minWidth: minWidth, width: width }}
            inputProps={{ 'aria-label': 'search' }}
          />
      </ClickAwayListener>
    )
  } else return (
    <IconButton>
      <SearchIcon onClick={() => {
        handleSearchMode()
      }} />
    </IconButton>
  )
}

export default withStyles(styles)(Search)