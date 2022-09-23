import React from 'react'
import classes from './progressIndicator.module.scss'

export interface ProgressIndicatorProps {
  percentageCompleted: number
}

export const ProgressIndicator = ({
  percentageCompleted,
}: ProgressIndicatorProps): JSX.Element => {
  const percentageCompletedNormalized =
    percentageCompleted < 0
      ? 0
      : percentageCompleted > 100
      ? 100
      : percentageCompleted

  return (
    <div className={classes.progressBar}>
      <div
        className={classes.progressBar_completed}
        style={{
          width: `${
            percentageCompletedNormalized === 0
              ? // Provide a minimum width when percentage is 0
                '25px'
              : percentageCompletedNormalized + '%'
          }`,
        }}
      >
        {percentageCompletedNormalized === 100
          ? `🎉 ${percentageCompletedNormalized}%`
          : `${percentageCompletedNormalized}%`}
      </div>
    </div>
  )
}
