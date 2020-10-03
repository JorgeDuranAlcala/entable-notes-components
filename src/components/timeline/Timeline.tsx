import React from 'react'
import { compareAsc, eachDayOfInterval, differenceInDays, format, differenceInCalendarDays } from 'date-fns'
import { eachQuarterOfInterval, startOfQuarter, endOfQuarter } from 'date-fns'
import { startOfMonth, endOfMonth, eachMonthOfInterval } from 'date-fns'
import { startOfWeek, endOfWeek, eachWeekOfInterval } from 'date-fns'
import { projectColors } from '../../theme/palette'
import useStyles from './styles'
import Line from './Line'
import { MAX_DATE, MIN_DATE } from 'helpers/constants'

interface ILine {
  name: string
  dates: number[]
  milestone?: boolean
}

interface ITimeline {
  lane: string
  color: string
  people: string[]
  lines: ILine[]
}
interface IProps {
  dateView: string
  data: ITimeline[]
  users: string[][]
}
interface IDateTitle {
  title: string
  width: number
}

const DAY_WIDTH = {
  QUARTER: 0.3,
  MONTHLY: 0.6,
  WEEK: 1.2,
  DAY: 4.8,
}
const Timeline = (props: IProps) => {
  let dateView = props.dateView
  let timelines = props.data
  let users = props.users
  console.log('users', users)
  const clases = useStyles()
  /**
   * Get the most early date of all lines
   */
  const getStartedDate = () => {
    let startedDate = new Date(MAX_DATE)
    timelines.map(timeline => {
      timeline.lines.map(line => {
        let date = new Date(line.dates[0])
        if (compareAsc(startedDate, date) === 1) startedDate = date
      })
    })
    switch (dateView) {
      case 'quarter':
        startedDate = startOfQuarter(startedDate)
        break
      case 'monthly':
        startedDate = startOfMonth(startedDate)
        break
      case 'week':
        startedDate = startOfWeek(startedDate)
      default:
        break
    }
    return startedDate
  }

  /**
   * Get the most early date of all lines
   */
  const getLastDate = () => {
    let lastDate = new Date(MIN_DATE)
    timelines.map(timeline => {
      timeline.lines.map(line => {
        let date = new Date(line.dates[1])
        if (compareAsc(lastDate, date) === -1) lastDate = date
      })
    })
    switch (dateView) {
      case 'quarter':
        lastDate = endOfQuarter(lastDate)
        break
      case 'monthly':
        lastDate = endOfMonth(lastDate)
        break
      case 'week':
        lastDate = endOfWeek(lastDate)
        break
      default:
        break
    }
    return lastDate
  }

  /**
   * Get the dates titles depending of the date view
   */
  const getDateTitles = () => {
    let titles: IDateTitle[] = []
    switch (dateView) {
      case 'quarter':
        eachQuarterOfInterval({ start: startDate, end: endDate }).map(quarter => {
          let startDayOfQuarter = startOfQuarter(quarter)
          let endDayOfQuarter = endOfQuarter(quarter)
          let daysOfQuarter = differenceInDays(endDayOfQuarter, startDayOfQuarter) + 1
          titles.push({ title: `${format(quarter, 'yyyy QQQ')}`, width: daysOfQuarter })
        })
        break
      case 'monthly':
        eachMonthOfInterval({ start: startDate, end: endDate }).map(month => {
          let startDayOfMonth = startOfMonth(month)
          let endDayOfMonth = endOfMonth(month)
          let daysOfMonth = differenceInDays(endDayOfMonth, startDayOfMonth) + 1
          titles.push({ title: `${format(month, 'yyyy MMMM')}`, width: daysOfMonth })
        })
        break
      case 'week':
        eachWeekOfInterval({ start: startDate, end: endDate }).map(week => {
          let startDayOfWeek = startOfWeek(week)
          let endDayOfWeek = endOfWeek(week)
          let daysOfWeek = differenceInDays(endDayOfWeek, startDayOfWeek) + 1
          titles.push({ title: `${format(week, 'yyyy')} Week ${format(week, 'w')}`, width: daysOfWeek })
        })
        break
      case 'day':
        eachDayOfInterval({ start: startDate, end: endDate }).map(day => {
          titles.push({ title: `${format(day, 'yyyy MMM d')}`, width: 1 })
        })
      default:
        break
    }
    return titles
  }

  /**
   * Get the column width of each day of the timeline
   */
  const getDayWidth = () => {
    switch (dateView) {
      case 'quarter':
        return DAY_WIDTH.QUARTER
      case 'monthly':
        return DAY_WIDTH.MONTHLY
      case 'week':
        return DAY_WIDTH.WEEK
      case 'day':
        return DAY_WIDTH.DAY
      default:
        return 0
    }
  }

  let startDate = getStartedDate()
  let endDate = getLastDate()
  let tagRow = 3
  let dateTitles: IDateTitle[] = getDateTitles()
  let columnWidth = getDayWidth()
  let currentColumn = 2

  return (
    <div className={clases.container}>
      <div className={clases.grid} style={{ gridAutoColumns: columnWidth + 'rem' }}>
        {dateTitles.map(dateTitle => {
          let startColumn = currentColumn
          let endColumn = (currentColumn = startColumn + dateTitle.width)
          return (
            <p
              style={{ gridRow: 1, gridColumnStart: startColumn, gridColumnEnd: endColumn, textAlign: 'center' }}
              className={clases.day}
            >
              {dateTitle.title}
            </p>
          )
        })}
        {timelines.map((timeline: ITimeline, idx) => {
          const startRow = tagRow
          let color = ''

          //Getting the background color of the current section
          Object.entries(projectColors).map(obj => {
            if (obj[0] === timeline.color) color = obj[1]
          })

          return (
            <>
              {
                //Getting the lines
                timeline.lines.map(line => {
                  let lineStartDate = new Date(line.dates[0])
                  let lineEndDate = new Date(line.dates[1])
                  const startColumn = differenceInCalendarDays(lineStartDate, startDate) + 2
                  const endColumn = startColumn + differenceInCalendarDays(lineEndDate, lineStartDate) + 1
                  const lineUsers = users.filter(user => {
                    return timeline.people.includes(user[0].toString())
                  })
                  const lineUsersObject = lineUsers.map(lineUser => {
                    return { name: lineUser[3], src: lineUser[2] }
                  })
                  console.log('timeline ' + line.name, lineUsersObject)
                  return (
                    <Line
                      users={lineUsersObject}
                      color={color}
                      row={tagRow++}
                      startColumn={startColumn}
                      endColumn={endColumn}
                      text={line.name}
                    />
                  )
                })
              }
              <div
                style={{
                  gridRowStart: startRow,
                  gridRowEnd: tagRow++,
                  backgroundColor: color,
                }}
                className={`${clases.tag} `}
              >
                <p>{timeline.lane}</p>
              </div>
            </>
          )
        })}
      </div>
    </div>
  )
}

export default Timeline
