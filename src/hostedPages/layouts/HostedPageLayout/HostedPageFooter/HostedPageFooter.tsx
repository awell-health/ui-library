import React, { FC, useCallback } from 'react'
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

  const handleScrollClick = useCallback(() => {
    const mainContentEl = document.getElementById(
      'ahp_main_content_with_scroll_hint'
    )
    if (mainContentEl) {
      const scrollAmount = mainContentEl.clientHeight * 0.8
      mainContentEl.scrollBy({
        top: scrollAmount,
        behavior: 'smooth',
      })
    }
  }, [])

  const footerClass = fixPosition
    ? `${classes.footer} ${classes.fixed}`
    : classes.footer

  return (
    <footer className={footerClass}>
      {!hideScrollHint && showScrollHint && (
        <div className={classes.scrollHint} id="awell__scroll_hint">
          <ScrollIndicator onClick={handleScrollClick} />
        </div>
      )}
      {children}
    </footer>
  )
}
