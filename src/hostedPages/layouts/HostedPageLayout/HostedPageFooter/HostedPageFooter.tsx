import React, { FC } from 'react'
import { ScrollIndicator } from '../../../../atoms'
import classes from './hostedPageFooter.module.scss'

export interface HostedPageFooterProps {
  children: React.ReactNode | string
  showScrollHint?: boolean
  fixPosition?: boolean
}

export const HostedPageFooter: FC<HostedPageFooterProps> = ({
  children,
  showScrollHint = false,
  fixPosition = false,
}) => {
  const footerClass = fixPosition
    ? `${classes.footer} ${classes.fixed}`
    : classes.footer

  return (
    <footer className={footerClass}>
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
