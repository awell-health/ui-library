import React from 'react'
import classes from './progressIndicator.module.scss'

export interface ProgressIndicatorProps {
  percentageCompleted: number
  showPercentage?: boolean
}

export const ProgressIndicator = ({
  percentageCompleted,
  showPercentage = false,
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
    <div
      className={`${classes.progressBar} awell_progress_bar`}
      id="awell__form_progress"
    >
      {percentageCompletedNormalized !== 0 && (
        <div className={classes.progressBar_completed} style={style}>
          {showPercentage && (
            <span id="awell_progress_percentage">
              {percentageCompletedNormalized}%
            </span>
          )}
        </div>
      )}
    </div>
  )
}
