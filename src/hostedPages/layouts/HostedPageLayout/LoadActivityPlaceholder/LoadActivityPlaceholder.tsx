import classes from './loadActivityPlaceholder.module.scss'
import React, { FC } from 'react'

export const LoadActivityPlaceholder: FC = (): JSX.Element => {
  return (
    <div className={classes.loading_indicators}>
      <div className={classes.loading_indicator}></div>
      <div className={classes.loading_indicator}></div>
      <div className={classes.loading_indicator}></div>
    </div>
  )
}
