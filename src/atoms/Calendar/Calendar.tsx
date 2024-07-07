import React from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { FC, useState } from 'react'
import classes from './Calendar.module.scss'
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isToday,
  isSameDay,
  isBefore,
} from 'date-fns'
import { CircularSpinner } from '../spinner'

export interface CalendarProps {
  value?: Date
  onSelect: (date: Date) => void
  month?: Date
  availableDates?: Date[]
  loading?: boolean
  weekStartsOn?: 'sunday' | 'monday'
}

export const Calendar: FC<CalendarProps> = ({
  value,
  onSelect,
  month = new Date(),
  availableDates = [],
  loading,
  weekStartsOn = 'sunday',
}) => {
  const [currentMonth, setCurrentMonth] = useState(month)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(value)

  const handlePreviousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  const handleDateClick = (date: Date) => {
    if (!isDisabled(date)) {
      setSelectedDate(date)
      onSelect(date)
    }
  }

  const isAvailable = (date: Date) => {
    return availableDates.some((availableDate) =>
      isSameDay(date, availableDate)
    )
  }

  const isDisabled = (date: Date) => {
    return isBefore(date, new Date()) && !isToday(date)
  }

  const generateDays = (month: Date) => {
    const weekStartsOnIndex = weekStartsOn === 'sunday' ? 0 : 1
    const start = startOfWeek(startOfMonth(month), {
      weekStartsOn: weekStartsOnIndex,
    })
    const end = endOfWeek(endOfMonth(month), {
      weekStartsOn: weekStartsOnIndex,
    })

    return eachDayOfInterval({ start, end }).map((date) => ({
      date,
      isCurrentMonth: isSameMonth(date, month),
      isToday: isToday(date),
      isSelected: selectedDate ? isSameDay(date, selectedDate) : false,
      isDisabled: isDisabled(date),
      isAvailable: isAvailable(date),
    }))
  }

  const days = generateDays(currentMonth)

  const renderWeekDaysHeader = () => {
    const weekDays =
      weekStartsOn === 'sunday'
        ? ['S', 'M', 'T', 'W', 'T', 'F', 'S']
        : ['M', 'T', 'W', 'T', 'F', 'S', 'S']

    return weekDays.map((day, index) => <div key={index}>{day}</div>)
  }

  return (
    <div className={classes.calendarContainer}>
      {loading && (
        <div className={classes.loadingOverlay}>
          <CircularSpinner size="sm" />
        </div>
      )}
      <div className={classes.calendarNavigation}>
        <button
          type="button"
          className={classes.navButton}
          onClick={handlePreviousMonth}
        >
          <span className={classes.srOnly}>Previous month</span>
          <ChevronLeftIcon className={classes.navIcon} aria-hidden="true" />
        </button>
        <div className={classes.activeMonth}>
          {format(currentMonth, 'MMMM yyyy')}
        </div>
        <button
          type="button"
          className={classes.navButton}
          onClick={handleNextMonth}
        >
          <span className={classes.srOnly}>Next month</span>
          <ChevronRightIcon className={classes.navIcon} aria-hidden="true" />
        </button>
      </div>
      <div className={classes.calendarDaysHeader}>{renderWeekDaysHeader()}</div>
      <div className={classes.calendarBody}>
        {days.map((day, dayIdx) => (
          <button
            key={day.date.toString()}
            type="button"
            onClick={() => handleDateClick(day.date)}
            disabled={day.isDisabled}
            className={clsx(
              classes.defaultDayStyle,
              day.isCurrentMonth
                ? classes.dayIsInCurrentMonth
                : classes.dayIsNotInCurrentMonth,
              (day.isSelected || day.isToday) &&
                classes.dayIsSelectedAndIsToday,
              day.isSelected && classes.dayIsSelected,
              day.isDisabled && classes.dayIsDisabled,
              !day.isDisabled &&
                !day.isSelected &&
                day.isCurrentMonth &&
                !day.isToday &&
                classes.dayIsNotSelectedAndIsCurrentMonthAndIsNotToday,
              !day.isDisabled &&
                !day.isSelected &&
                !day.isCurrentMonth &&
                !day.isToday &&
                classes.dayIsNotSelectedAndIsNotCurrentMonthAndIsNotToday,
              day.isToday &&
                !day.isSelected &&
                classes.dayIsTodayAndNotSelected,
              dayIdx === 0 && classes.topLeftDay,
              dayIdx === 6 && classes.topRightDay,
              dayIdx === days.length - 7 && classes.bottomLeftDay,
              dayIdx === days.length - 1 && classes.bottomRightDay
            )}
          >
            <time
              dateTime={day.date.toISOString()}
              className={clsx(
                classes.dayNumber,
                day.isSelected &&
                  day.isToday &&
                  classes.dayNumberIsSelectedAndIsToday,
                day.isSelected &&
                  !day.isToday &&
                  classes.dayNumberIsSelectedAndIsNotToday,
                day.isAvailable && classes.dayIsAvailable,
                day.isAvailable &&
                  day.isSelected &&
                  classes.availableDayNumberSelected,
                day.isAvailable &&
                  day.isDisabled &&
                  classes.availableDayNumberDisabled
              )}
            >
              {day.date.getDate()}
            </time>
          </button>
        ))}
      </div>
    </div>
  )
}
