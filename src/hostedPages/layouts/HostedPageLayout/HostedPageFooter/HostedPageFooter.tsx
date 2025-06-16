import React, { FC, useEffect, useRef } from 'react'
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
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (scrollIndicatorRef.current) {
        const { scrollTop, scrollHeight, clientHeight } =
          document.documentElement
        const isAtBottom = scrollTop + clientHeight >= scrollHeight - 2
        scrollIndicatorRef.current.style.opacity = isAtBottom ? '0' : '1'
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const footerClass = fixPosition
    ? `${classes.footer} ${classes.fixed}`
    : classes.footer

  return (
    <footer className={footerClass}>
      {showScrollHint && (
        <div
          ref={scrollIndicatorRef}
          className={`${classes.scrollHint}`}
          id="awell__scroll_hint"
        >
          <ScrollIndicator />
        </div>
      )}
      {children}
    </footer>
  )
}
