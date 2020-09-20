import React, { useState } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import clsx from 'clsx'
import Chip from '@material-ui/core/Chip'
import MenuItem from '@material-ui/core/MenuItem'
import Paper from '@material-ui/core/Paper'
import { emphasize } from '@material-ui/core/styles/colorManipulator'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Select from 'react-select'
import Creatable from 'react-select/creatable'

import './styles.scss'

const useStyles = makeStyles((theme:Theme) => ({
	root: {
		'& .chip-select__input': {
			color: theme.palette.text.primary
		},
		'&.standard': {
			'& $placeholder': {},
			'& $valueContainer': {
				paddingTop: 4
			}
		},
		'&.filled': {
			'& $placeholder': {
				left: 12
			},
			'& $valueContainer': {
				paddingTop: 24,
				paddingLeft: 12
			},
			'& $chip': {
				border: '1px solid rgba(0, 0, 0, 0.12)'
			}
		},
		'&.outlined': {
			'& $placeholder': {
				left: 12
			},
			'& $valueContainer': {
				paddingLeft: 12,
				paddingTop: 12
			}
		}
	},
	input: {
		display: 'flex',
		padding: 0,
		height: 'auto'
	},
	valueContainer: {
		display: 'flex',
		flexWrap: 'wrap',
		flex: 1,
		alignItems: 'center',
		paddingBottom: 4,
		paddingTop: 12,
		minHeight: 40
	},
	chip: {
		margin: '4px 4px 4px 0'
	},
	chipFocused: {
		backgroundColor: emphasize(
			theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
			0.08
		)
	},
	noOptionsMessage: {
		padding: `${theme.spacing()}px ${theme.spacing(2)}px`
	},
	singleValue: {
		fontSize: 16
	},
	placeholder: {
		position: 'absolute',
		left: 0,
		fontSize: 16,
		margin: 0
	},
	paper: {
		position: 'absolute',
		zIndex: 2,
		marginTop: theme.spacing(),
		left: 0,
		right: 0
	},
	divider: {
		height: theme.spacing(2)
	}
}))

function NoOptionsMessage(props: any) {
	const classes = useStyles()

	return (
		<Typography color="textSecondary" className={classes.noOptionsMessage} {...props.innerProps}>
			{props.children}
		</Typography>
	)
}

function inputComponent({ inputRef, ...props }:any) {
	return <div ref={inputRef} {...props} />
}

function Control(props:any) {
	const classes = useStyles()

	return (
		<TextField
			fullWidth
			className={clsx(classes.root, props.selectProps.textFieldProps.variant)}
			required={props.selectProps.required}
			error={props.selectProps.error}
			InputProps={{
				inputComponent,
				inputProps: {
					className: classes.input,
					inputRef: props.innerRef,
					children: props.children,
					...props.innerProps
				}
			}}
			{...props.selectProps.textFieldProps}
		/>
	)
}

function Option(props:any) {
	return (
		<MenuItem
			buttonRef={props.innerRef}
			selected={props.isFocused}
			component="div"
			style={{
				fontWeight: props.isSelected ? 600 : 400
			}}
			{...props.innerProps}
		>
			{props.children}
		</MenuItem>
	)
}

function Placeholder(props:any) {
	const classes = useStyles()

	return (
		<Typography color="textSecondary" className={classes.placeholder} {...props.innerProps}>
			{props.children}
		</Typography>
	)
}

function SingleValue(props:any) {
	const classes = useStyles()

	return (
		<Typography className={classes.singleValue} {...props.innerProps}>
			{props.children}
		</Typography>
	)
}

function ValueContainer(props:any) {
	const classes = useStyles()

	return <div className={classes.valueContainer}>{props.children}</div>
}

function MultiValue(props:any) {
	const classes = useStyles()
	const { size = 'small' } = props
	return (
		<Chip
			tabIndex={-1}
			label={props.children}
			className={clsx(
				classes.chip,
				{
					[classes.chipFocused]: props.isFocused
				},
			)}
			size={size}
			style={{ color: props.data.text, backgroundColor: props.data.bg }}
			onDelete={(event:any) => {
				props.removeProps.onClick()
				props.removeProps.onMouseDown(event)
			}}
		/>
	)
}

function Menu(props:any) {
	const classes = useStyles()

	return (
		<Paper square className={classes.paper} {...props.innerProps}>
			{props.children}
		</Paper>
	)
}

const components = {
	Control,
	Menu,
	MultiValue,
	NoOptionsMessage,
	Option,
	Placeholder,
	SingleValue,
	ValueContainer
}

function ChipSelect(props: any) {
	const [showColorPicker, setShowColorPicker] = useState(false)

	const handleOnChange = (value:any) => {
		if (value === null) {
			value = []
		}
		if (props.onChange) {
			props.onChange(value)
			setShowColorPicker(true)
		}
	}

	return props.variant === 'fixed' ? (
		<Select classNamePrefix="chip-select" {...props} components={components} onChange={handleOnChange} />
	) : (
		<Creatable classNamePrefix="chip-select" {...props} components={components} onChange={handleOnChange} />
	)
}

export default React.memo(ChipSelect)