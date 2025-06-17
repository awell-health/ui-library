import React, { FC } from 'react'
import { ScrollIndicator } from '../../../../atoms'
import { useScrollHint } from '../../../../hooks/useScrollHint'
import classes from './hostedPageFooter.module.scss'

export interface HostedPageFooterProps {
  children: React.ReactNode | string
  hideScrollHint?: boolean
  fixPosition?: boolean
}

export const HostedPageFooter: FC<HostedPageFooterProps> = ({
  children,
  hideScrollHint = false,
  fixPosition = false,
}) => {
  const { showScrollHint } = useScrollHint()

  const footerClass = fixPosition
    ? `${classes.footer} ${classes.fixed}`
    : classes.footer

  return (
    <footer className={footerClass}>
      {!hideScrollHint && showScrollHint && (
        <div className={classes.scrollHint} id="awell__scroll_hint">
          <ScrollIndicator />
        </div>
      )}
      {children}
    </footer>
  )
}
