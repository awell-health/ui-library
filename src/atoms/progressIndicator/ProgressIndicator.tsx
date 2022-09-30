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

  const style = {
    '--awell-progress-bar-width': `${percentageCompletedNormalized + '%'}`,
  } as React.CSSProperties

  return (
    <div className={classes.progressBar}>
      {percentageCompletedNormalized !== 0 && (
        <div className={classes.progressBar_completed} style={style}>
          {percentageCompletedNormalized === 100
            ? `🎉 ${percentageCompletedNormalized}%`
            : `${percentageCompletedNormalized}%`}
        </div>
      )}
    </div>
  )
}
