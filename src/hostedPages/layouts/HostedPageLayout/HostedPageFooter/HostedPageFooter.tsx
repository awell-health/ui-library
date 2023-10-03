import React, { FC } from 'react'
import { ScrollIndicator } from '../../../../atoms'
import classes from './hostedPageFooter.module.scss'

export interface HostedPageFooterProps {
  children: React.ReactNode | string
  showScrollHint?: boolean
}

export const HostedPageFooter: FC<HostedPageFooterProps> = ({
  children,
  showScrollHint = false,
}) => {
  return (
    <footer className={classes.footer}>
      <div
        className={`${classes.scrollHint} ${
          showScrollHint ? classes.visible : classes.hidden
        }`}
        id="awell__form_scrollhint"
      >
        <ScrollIndicator />
      </div>
      {children}
    </footer>
  )
}
