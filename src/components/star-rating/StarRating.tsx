import React, { useEffect } from 'react'
import Rating from '@material-ui/lab/Rating'

export default function SimpleRating({
  name,
  value,
  cellId,
  updateCellVal,
}: {
  name?: string
  value: 0 | 1 | 2 | 3 | 4 | 5 | null
  cellId?: string
  updateCellVal?: (cellId: string, newVal: number | null) => void
}) {
  const [val, setVal] = React.useState<number | null>(value)

  useEffect(() => {
    if (val !== value) {
      setVal(value)
    }
  }, [value]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Rating
      data-test="table-starrating"
      name={name || 'Rating'}
      value={val}
      onChange={(_event, newValue: number | null) => {
        setVal(newValue)
        updateCellVal && cellId && updateCellVal(cellId, newValue)
      }}
    />
  )
}
