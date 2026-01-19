import React from 'react'

import classes from './ScrollIndicator.module.scss'

interface ScrollIndicatorProps {
  onClick?: () => void
}

export const ScrollIndicator = ({ onClick }: ScrollIndicatorProps) => {
  return (
    <button
      type="button"
      className={classes.scroll_indicator_container}
      onClick={onClick}
      aria-label="Scroll down for more content"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className={classes.scroll_indicator_svg}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75"
        />
      </svg>
    </button>
  )
}
