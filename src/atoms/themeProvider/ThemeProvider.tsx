import React, { FC } from 'react'
import { getTextColor, opacityColor, shadeColor } from './helpers'
import classes from './themeProvider.module.scss'

export interface ThemeProviderProps {
  children: React.ReactNode | string
  accentColor?: string
}

export const ThemeProvider: FC<ThemeProviderProps> = ({
  children,
  accentColor = 'var(--awell-brand100, #004ac2)',
}) => {
  const style = {
    '--awell-accent-color': accentColor,
    '--awell-accent-text-color': getTextColor(accentColor),
    '--awell-accent-hover-color': opacityColor(accentColor, 0.9),
    '--awell-accent-ring-color-inputs': accentColor,
    '--awell-accent-ring-color-buttons': opacityColor(accentColor, 0.4),
    '--awell-secondary-color': opacityColor(accentColor, 0.2),
    '--awell-secondary-text-color': accentColor,
    '--awell-secondary-hover-color': opacityColor(accentColor, 0.3),
    '--awell-secondary-ring-color-inputs': accentColor,
    '--awell-secondary-ring-color-buttons': accentColor,
    height: '100%',
  } as React.CSSProperties
  return (
    <div className={classes.awell_themeProvider} style={style}>
      {children}
    </div>
  )
}
